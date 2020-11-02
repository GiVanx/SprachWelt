import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { LeakyTextGame } from '../model/leaky-text-game.model';
import { WordStatus } from '../model/word-status';
import { Word } from '../model/word.model';
import { GameService } from '../service/game.service';
import { GameStatusView } from '../view/game-status.view';
import { LeakyTextGameView } from '../view/leaky-text-game.view';
import { GameState, initialGameState } from './game.state';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  private gameState: BehaviorSubject<GameState> = new BehaviorSubject(
    initialGameState
  );
  private requestInProgress: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  constructor(private gameService: GameService) {}

  selectActiveGameRequestSentAtLeastOnce(): Observable<boolean> {
    return this.gameState
      .asObservable()
      .pipe(map((gameState) => gameState.activeGameSentAtLeastOnce));
  }

  selectActiveGame(): Observable<LeakyTextGame> {
    return this.gameState
      .asObservable()
      .pipe(
        map((gameState) => gameState.game.selectById(gameState.activeGameId))
      );
  }

  selectActiveGameId() {
    return this.gameState
      .asObservable()
      .pipe(map((gameState) => gameState.activeGameId));
  }

  selectRequestInProgress() {
    return this.requestInProgress.asObservable();
  }

  selectTextReadyToCheck(): Observable<boolean> {
    return this.gameState
      .asObservable()
      .pipe(
        map(
          (state) =>
            state.wordsToBeEvaluated.length ===
            state.totalCountWordsToBeEvaluated
        )
      );
  }

  selectAllMissingWords() {
    return this.gameState
      .asObservable()
      .pipe(map((state) => state.missingWords.selectAll()));
  }

  selectAllTextWithGaps() {
    return this.gameState
      .asObservable()
      .pipe(map((state) => state.textWithGaps.selectAll()));
  }

  moveWordFromMissingToTextGap(textGapId: number, missingWordId: number) {
    let state = this.gameState.getValue();

    let textGap = state.textWithGaps.selectById(textGapId);
    const missingWord = state.missingWords.selectById(missingWordId);

    // if the user previously selected a word for this text gap
    if (textGap.status === WordStatus.TO_BE_EVALUATED) {
      textGap = this.moveWordFromTextGapToMissingWords(textGap);
    }
    this._moveWordFromMissingToTextGap(textGap, missingWord);
  }

  moveWordFromTextGapToMissingWords(word: Word) {
    let state = this.gameState.getValue();

    const newTextGap = {
      ...word,
      id: uuidv4(),
      status: WordStatus.MISSING,
    };
    state.textWithGaps.replace(word.id, newTextGap);

    state.missingWords.upsert({
      ...word,
      status: WordStatus.IDLE,
    });

    state.wordsToBeEvaluated = state.wordsToBeEvaluated.filter(
      (id) => id !== word.id
    );

    this.gameState.next(state);
    return newTextGap;
  }

  _moveWordFromMissingToTextGap(textGap: Word, missingWord: Word) {
    let state = this.gameState.getValue();

    state.textWithGaps.replace(textGap.id, {
      ...missingWord,
      status: WordStatus.TO_BE_EVALUATED,
      position: textGap.position,
    });

    state.missingWords.delete(missingWord);
    state.wordsToBeEvaluated.push(missingWord.id);

    this.gameState.next(state);
  }

  createGameRequest(text: string) {
    this.requestInProgress.next(true);

    const createGame$ = this.gameService.create(text).pipe(
      tap((response) => {
        this.updateState(response);
        this.requestInProgress.next(false);
      }),
      shareReplay()
    );

    createGame$.subscribe();

    return createGame$;
  }

  getActiveGameRequest() {
    this.requestInProgress.next(true);

    const activeGame$ = this.gameService.getActiveGame().pipe(
      tap((response) => {
        console.log('GameFacade:getActiveGameRequest(): ' + response);
        this.updateState(response);
        this.requestInProgress.next(false);
      }),
      shareReplay()
    );

    activeGame$.subscribe();

    return activeGame$;
  }

  startGameRequest() {
    this.requestInProgress.next(true);
    const startGame$ = this.gameService
      .startGame(this.gameState.getValue().activeGameId)
      .pipe(
        tap((response) => {
          this.updateGameStatus(response);
          this.requestInProgress.next(false);
        }),
        shareReplay()
      );

    startGame$.subscribe();
    return startGame$;
  }

  remixGameRequest(level) {
    this.requestInProgress.next(true);
    const remixGame$ = this.gameService
      .remix(this.gameState.getValue().activeGameId, level)
      .pipe(
        tap((response) => {
          this.updateState(response);
          this.requestInProgress.next(false);
        }),
        shareReplay()
      );

    remixGame$.subscribe();
    return remixGame$;
  }

  cancelGameRequest() {
    this.requestInProgress.next(true);
    const cancelGame$ = this.gameService
      .cancel(this.gameState.getValue().activeGameId)
      .pipe(
        tap(() => {
          this.updateState(null);
          this.requestInProgress.next(false);
        }),
        shareReplay()
      );

    cancelGame$.subscribe();
    return cancelGame$;
  }

  checkWords() {
    const state = this.gameState.getValue();
    const toBeEvaluated = state.wordsToBeEvaluated;

    const textGapWordEntities = state.textWithGaps.selectEntities();

    const wordsToCheck = toBeEvaluated.map((wordId) =>
      textGapWordEntities.get(wordId)
    );

    const checkWords$ = this.gameService
      .checkWords(state.activeGameId, wordsToCheck)
      .pipe(shareReplay());

    checkWords$.subscribe((evaluatedWords: Word[]) => {
      const state = this.gameState.getValue();

      for (let word of evaluatedWords) {
        state.textWithGaps.replace(word.id, word);
      }

      this.gameState.next(state);
    });

    return checkWords$;
  }

  private getTextWithGaps(words: Word[]): Word[] {
    const result: Word[] = [];
    let i = 0;
    let position = 0;

    do {
      while (position < words[i].position) {
        result.push(new Word(uuidv4(), null, position, WordStatus.MISSING));
        ++position;
      }
      result.push(words[i]);
      position = words[i].position + 1;
      ++i;
    } while (i < words.length);
    return result;
  }

  private updateGameStatus(game: GameStatusView) {
    let state = this.gameState.getValue();
    state.game.upsert(game);
    this.gameState.next(state);
  }

  private updateState(game: LeakyTextGameView) {
    let state = this.gameState.getValue();
    state.activeGameSentAtLeastOnce = true;
    if (game) {
      state = this.updateTextWithGaps(game, state);
      state = this.updateMissingWords(game, state);
      state = this.updateGame(game, state);
      state.activeGameId = game.id;
    } else {
      state.activeGameId = null;
    }
    this.gameState.next(state);
  }

  private updateGame(game: LeakyTextGameView, state: GameState) {
    const gameEntity = state.game.selectById(game.id);

    const missingWords = game.missingWords
      ? game.missingWords.map((w) => w.id)
      : gameEntity.missingWords;

    const textWithGaps = game.textWithGaps
      ? game.textWithGaps.map((w) => w.id)
      : gameEntity.textWithGaps;

    state.game.upsert({
      ...game,
      missingWords,
      textWithGaps,
    });
    return state;
  }

  private updateTextWithGaps(game: LeakyTextGameView, state: GameState) {
    if (game.textWithGaps) {
      const textWithGaps = this.getTextWithGaps(game.textWithGaps);
      state.textWithGaps.addAll(textWithGaps);
    }
    return state;
  }

  private updateMissingWords(game: LeakyTextGameView, state: GameState) {
    if (game.missingWords) {
      state.totalCountWordsToBeEvaluated = game.missingWords.length;
      state.missingWords.addAll(game.missingWords);
    }
    return state;
  }
}
