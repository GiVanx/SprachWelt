import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TextState, initialWordState } from './text.state';
import { map } from 'rxjs/operators';
import { TextService } from '../service/text.service';
import { WordStatus } from '../model/word-status';
import { Word } from '../model/word';
import { WordUtils } from '../model/word-utils';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TextStore {
  private _wordState: BehaviorSubject<TextState> = new BehaviorSubject(
    initialWordState
  );

  constructor(private wordService: TextService, private wordUtils: WordUtils) {}

  selectAllMissingWords() {
    return this._wordState
      .asObservable()
      .pipe(map((state) => state.missingWords.selectAll()));
  }

  selectAllTextWithGaps() {
    return this._wordState
      .asObservable()
      .pipe(map((state) => state.textWithGaps.selectAll()));
  }

  moveWordFromMissingToTextGap(textGapId: string, missingWordId: string) {
    let state = this._wordState.getValue();

    let textGap = state.textWithGaps.selectById(textGapId);
    const missingWord = state.missingWords.selectById(missingWordId);

    // if the user previously selected a word for this text gap
    if (textGap.status === WordStatus.TO_BE_EVALUATED) {
      textGap = this.moveWordFromTextGapToMissingWords(textGap);
    }
    this._moveWordFromMissingToTextGap(textGap, missingWord);
  }

  moveWordFromTextGapToMissingWords(word: Word) {
    let state = this._wordState.getValue();

    const newTextGap = {
      ...word,
      id: uuid.v4(),
      status: WordStatus.MISSING,
    };
    state.textWithGaps.replace(word.id, newTextGap);

    state.missingWords.add({
      ...word,
      status: WordStatus.IDLE,
    });

    this._wordState.next(state);
    return newTextGap;
  }

  _moveWordFromMissingToTextGap(textGap: Word, missingWord: Word) {
    let state = this._wordState.getValue();

    state.textWithGaps.replace(textGap.id, {
      ...missingWord,
      status: WordStatus.TO_BE_EVALUATED,
    });

    state.missingWords.delete(missingWord);

    this._wordState.next(state);
  }

  addTextRequest(text: string) {
    this.wordService.addText(text).subscribe((response) => {
      let state = this._wordState.getValue();

      const textWithGaps = this.processWords(
        response.textWithGaps,
        WordStatus.ORIGINAL
      );
      state.textWithGaps.addAll(textWithGaps);

      const missingWords = this.processWords(
        response.missingWords,
        WordStatus.IDLE
      );

      state.wordsToBeEvaluated.push(...missingWords.map((word) => word.id));
      state.missingWords.addAll(missingWords);

      this._wordState.next(state);
    });
  }

  checkWords() {
    const state = this._wordState.getValue();
    const toBeEvaluated = state.wordsToBeEvaluated;

    const textGapWordEntities = state.textWithGaps.selectEntities();

    const wordsToCheck = toBeEvaluated.map((wordId) =>
      textGapWordEntities.get(wordId)
    );

    this.wordService
      .checkWords(state.activeTextId, wordsToCheck)
      .subscribe((evaluatedWords: Word[]) => {
        const state = this._wordState.getValue();

        for (let word of evaluatedWords) {
          state.textWithGaps.replace(word.id, word);
        }

        this._wordState.next(state);
      });
  }

  processWords(words: Word[], status: WordStatus) {
    words = [...words];
    return words.map((word, position) => {
      if (!word) {
        return new Word(uuid.v4(), null, position, WordStatus.MISSING);
      }
      return { ...word, position, status };
    });
  }
}