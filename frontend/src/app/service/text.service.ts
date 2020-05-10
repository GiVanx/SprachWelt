import { Injectable } from '@angular/core';
import { TextWithGaps } from '../model/text-with-gaps';
import { Observable, of } from 'rxjs';
import { textWithGapsMock } from '../mock-data/text-with-gaps.data';
import { Word } from '../model/word';
import { checkedWordsMock } from '../mock-data/checked-words.data';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  addText(text: string): Observable<TextWithGaps> {
    return of(textWithGapsMock);
  }

  checkWords(textId: string, words: Word[]): Observable<Word[]> {
    return of(checkedWordsMock);
  }
}
