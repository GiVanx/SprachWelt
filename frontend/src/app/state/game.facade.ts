import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { GameState, initialWordState } from './game.state';
import { delay, map, tap } from 'rxjs/operators';
import { GameService } from '../service/text.service';
import { WordStatus } from '../model/word-status';
import { Word } from '../model/word';
import { WordUtils } from '../model/word-utils';
import { LeakyTextGame } from '../model/text-with-gaps';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  private gameState: BehaviorSubject<GameState> = new BehaviorSubject(
    initialWordState
  );
  private requestInProgress: BehaviorSubject<Boolean> = new BehaviorSubject(
    false
  );

  constructor(private wordService: GameService, private wordUtils: WordUtils) {}

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

    console.log('moveWordFromTextGapToMissingWords', 'word', word);

    const newTextGap = {
      ...word,
      id: Date.now(),
      status: WordStatus.MISSING,
    };
    console.log(
      'moveWordFromTextGapToMissingWords',
      'new text gap',
      newTextGap
    );
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
    this.wordService.create(text).subscribe((response) => {
      console.log('server response', response);
      this.updateState(response);
    });
  }

  getActiveGameRequest() {
    this.requestInProgress.next(true);
    return this.wordService.getActiveGame().pipe(
      tap((response) => {
        this.updateState(response);
        this.requestInProgress.next(false);
      }),
      delay(500)
    );
  }

  startGameRequest() {
    this.wordService
      .startGame(this.gameState.value.gameId)
      .subscribe((response) => {
        this.updateState(response);
      });
  }

  cancelGameRequest() {
    this.wordService
      .cancel(this.gameState.value.gameId)
      .subscribe((response) => {
        // TODO: clear state
      });
  }

  checkWords() {
    const state = this.gameState.getValue();
    const toBeEvaluated = state.wordsToBeEvaluated;

    const textGapWordEntities = state.textWithGaps.selectEntities();

    const wordsToCheck = toBeEvaluated.map((wordId) =>
      textGapWordEntities.get(wordId)
    );

    console.log('WORDS TO CHECK', wordsToCheck);

    this.wordService
      .checkWords(state.gameId, wordsToCheck)
      .subscribe((evaluatedWords: Word[]) => {
        console.log('CHECKED WORDS', evaluatedWords);
        const state = this.gameState.getValue();

        for (let word of evaluatedWords) {
          state.textWithGaps.replace(word.id, word);
        }

        console.log('final', state);
        this.gameState.next(state);
      });
  }

  private getTextWithGaps(words: Word[]): Word[] {
    const result: Word[] = [];
    let i = 0;
    let j = i + 1;
    if (i < words.length && j < words.length) {
      result.push(words[i]);
      let position = words[i].position + 1;
      while (position < words[j].position) {
        result.push(new Word(Date.now(), null, position, WordStatus.MISSING));
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
      console.log('text with gaps', textWithGaps);
      state.textWithGaps.addAll(textWithGaps);

      state.totalCountWordsToBeEvaluated = game.missingWords.length;
      state.missingWords.addAll(game.missingWords);
      state.gameId = game.id;

      this.gameState.next(state);
    }
  }
}
