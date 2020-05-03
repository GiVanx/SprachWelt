import { Injectable } from '@angular/core';
import { TextWithGaps } from '../model/text-with-gaps';
import { Observable, of } from 'rxjs';
import { textWithGapsMock } from '../mock-data/text-with-gaps.data';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  addText(text: string): Observable<TextWithGaps> {
    return of(textWithGapsMock);
  }
}
