import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { LeakyTextGame } from '../model/text-with-gaps';
import { Word } from '../model/word';
import { WordStatus } from '../model/word-status';
import { WordUtils } from '../model/word-utils';
import { GameService } from '../service/game.service';
import { GameState, initialWordState } from './game.state';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  private gameState: BehaviorSubject<GameState> = new BehaviorSubject(
    initialWordState
  );
  private requestInProgress: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private remixGame$: Observable<LeakyTextGame>;
  private startGame$: Observable<LeakyTextGame>;
  private cancelGame$: Observable<any>;

  constructor(private gameService: GameService, private wordUtils: WordUtils) {}

  selectActiveGameStatus() {
    return this.gameState.asObservable().pipe(map((game) => game.gameStatus));
  }

  selectActiveGameId() {
    return this.gameState.asObservable().pipe(map((game) => game.gameId));
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

    state.missingWords.add({
      ...word,
      status: WordStatus.IDLE,
    });

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

    this.gameState.next(state);
  }

  createGameRequest(text: string) {
    this.gameService.create(text).subscribe((response) => {
      console.log('server response', response);
      this.updateState(response);
    });
  }

  getActiveGameRequest() {
    this.requestInProgress.next(true);
    return this.gameService.getActiveGame().pipe(
      tap((response) => {
        this.updateState(response);
        this.requestInProgress.next(false);
      })
    );
  }

  startGameRequest() {
    this.requestInProgress.next(true);
    if (!this.startGame$) {
      // TODO: check if this works when a new game is created
      // I think the gameId will remain the same.
      // TODO: check that when using a http request, the request is
      // sent each time without shareReplay().
      this.startGame$ = this.gameService
        .startGame(this.gameState.value.gameId)
        .pipe(
          tap((response) => {
            this.updateState(response);
            this.requestInProgress.next(false);
          }),
          shareReplay()
        );
    }

    this.startGame$.subscribe();
    return this.startGame$;
  }

  remixGameRequest(level) {
    this.requestInProgress.next(true);
    if (!this.remixGame$) {
      this.remixGame$ = this.gameService
        .remix(this.gameState.value.gameId, level)
        .pipe(
          tap((response) => {
            console.log('got a response');
            this.updateState(response);
            this.requestInProgress.next(false);
          }),
          shareReplay()
        );
    }
    this.remixGame$.subscribe();
    return this.remixGame$;
  }

  cancelGameRequest() {
    this.requestInProgress.next(true);
    if (!this.cancelGame$) {
      this.cancelGame$ = this.gameService
        .cancel(this.gameState.value.gameId)
        .pipe(
          tap(() => {
            this.updateState(null);
            this.requestInProgress.next(false);
          }),
          shareReplay()
        );
    }
    this.cancelGame$.subscribe();
    return this.cancelGame$;
  }

  checkWords() {
    const state = this.gameState.getValue();
    const toBeEvaluated = state.wordsToBeEvaluated;

    const textGapWordEntities = state.textWithGaps.selectEntities();

    const wordsToCheck = toBeEvaluated.map((wordId) =>
      textGapWordEntities.get(wordId)
    );

    const checkWords$ = this.gameService
      .checkWords(state.gameId, wordsToCheck)
      .pipe(shareReplay());

    checkWords$.subscribe((evaluatedWords: Word[]) => {
      console.log('CHECKED WORDS', evaluatedWords);
      const state = this.gameState.getValue();

      for (let word of evaluatedWords) {
        state.textWithGaps.replace(word.id, word);
      }

      console.log('final', state);
      this.gameState.next(state);
    });

    return checkWords$;
  }

  private getTextWithGaps(words: Word[]): Word[] {
    const result: Word[] = [];
    let i = 0;
    let j = i + 1;
    while (i < words.length && j < words.length) {
      result.push(words[i]);
      let position = words[i].position + 1;
      while (position < words[j].position) {
        result.push(new Word(uuidv4(), null, position, WordStatus.MISSING));
        ++position;
      }
      ++i;
      ++j;
    }
    return result;
  }

  private updateState(game: LeakyTextGame) {
    if (game) {
      let state = this.gameState.getValue();

      const textWithGaps = this.getTextWithGaps(game.textWithGaps);
      state.textWithGaps.addAll(textWithGaps);

      state.totalCountWordsToBeEvaluated = game.missingWords.length;
      state.missingWords.addAll(game.missingWords);
      state.gameId = game.id;
      state.gameStatus = game.status;

      this.gameState.next(state);
    } else {
      this.clearState();
    }
  }

  private clearState() {
    let state = this.gameState.getValue();

    state.gameId = null;
    state.gameStatus = null;

    this.gameState.next(state);
  }
}
