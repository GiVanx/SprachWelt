import { Injectable } from '@angular/core';
import { MissingWord } from './model/missing-word';
import { TextWithGaps } from './model/text-with-gaps';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  private selectedMissingWordSpace: number;
  private selectedMissingWord: MissingWord;

  constructor() {}

  selectMissingWordPosition(space: number) {
    this.selectedMissingWordSpace = space;
  }

  selectMissingWord(word: MissingWord) {
    this.selectedMissingWord = word;
  }

  getMissingWordPosition() {
    return this.selectedMissingWordSpace;
  }

  getMissingWord() {
    return this.selectedMissingWord;
  }

  saveText(text: string): TextWithGaps {}

  checkText(missingWord: MissingWord) {
    environment.textCheckEndpoint;
  }
}
