import { Injectable } from '@angular/core';
import { Word } from './word';

@Injectable({
  providedIn: 'root',
})
export class WordUtils {
  deepCopy(word: Word) {
    return new Word(word.id, word.content, word.position, word.status);
  }
}
