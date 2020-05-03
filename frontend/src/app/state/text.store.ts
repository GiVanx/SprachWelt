import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TextState, initialWordState } from './text.state';
import { map } from 'rxjs/operators';
import { TextService } from '../service/text.service';
import { WordStatus } from '../model/word-status';
import { Word } from '../model/word';

@Injectable({
  providedIn: 'root',
})
export class TextStore {
  private _wordState: BehaviorSubject<TextState> = new BehaviorSubject(
    initialWordState
  );

  constructor(private wordService: TextService) {}

  selectMissingWords() {
    return this._wordState
      .asObservable()
      .pipe(map((state) => state.missingWords));
  }

  selectTextWithGaps() {
    return this._wordState
      .asObservable()
      .pipe(map((state) => state.textWithGaps));
  }

  moveWordFromMissingToTextGap(textGapIndex: number, missingWordIndex: number) {
    let state = this._wordState.getValue();

    let textWithGaps = [...state.textWithGaps];
    textWithGaps[textGapIndex] = state.missingWords[missingWordIndex];
    textWithGaps[textGapIndex].status = WordStatus.TO_BE_EVALUATED;
    textWithGaps.forEach((word, index) => (word.position = index));

    let missingWords = [...state.missingWords];
    missingWords.splice(missingWordIndex, 1);
    missingWords.forEach((word, index) => (word.position = index));

    let wordsToBeEvaluated = [...state.wordsToBeEvaluated];
    wordsToBeEvaluated.push(textWithGaps[textGapIndex]);

    state = {
      ...state,
      textWithGaps,
      missingWords,
      wordsToBeEvaluated,
    };
    this._wordState.next(state);
  }

  addTextRequest(text: string) {
    this.wordService.addText(text).subscribe((response) => {
      let state = this._wordState.getValue();

      state = {
        ...state,
        textWithGaps: this.processWords(
          response.textWithGaps,
          WordStatus.ORIGINAL
        ),
        missingWords: this.processWords(response.missingWords, WordStatus.IDLE),
      };

      this._wordState.next(state);
    });
  }

  processWords(words: Word[], status: WordStatus) {
    words = [...words];
    return words.map((word, position) => {
      if (!word) {
        return new Word(null, position, WordStatus.MISSING);
      }
      return { ...word, position, status };
    });
  }
}
