import { Injectable } from '@angular/core';
import { TextWithGaps } from '../model/text-with-gaps';
import { Observable, of } from 'rxjs';
import { textWithGapsMock } from '../mock-data/text-with-gaps.data';
import { Word } from '../model/word';
import { checkedWordsMock } from '../mock-data/checked-words.data';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  constructor(private http: HttpClient) {}

  addText(text: string): Observable<TextWithGaps> {
    console.log('ADD TEXT', text);
    return this.http.post<TextWithGaps>(environment.textEndpoint(), text);
    // return of(textWithGapsMock);
  }

  checkWords(textId: string, words: Word[]): Observable<Word[]> {
    return this.http.post<Word[]>(environment.textCheckEndpoint(textId), words);
    // return of(checkedWordsMock).pipe(debounceTime(2000));
  }
}
