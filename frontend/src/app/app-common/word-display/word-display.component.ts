import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../../model/word';
import { WordStatus } from '../../model/word-status';

@Component({
  selector: 'app-word-display',
  templateUrl: './word-display.component.html',
  styleUrls: ['./word-display.component.less'],
})
export class WordDisplayComponent implements OnInit {
  timer;
  preventSingleClick: boolean;

  WORD_PLACEHOLDER = '?????';
  @Input() words: Word[];
  selectedOptions: Word[] = [];
  @Output() onWordSingleClick: EventEmitter<number> = new EventEmitter();
  @Output() onWordDoubleClick: EventEmitter<Word> = new EventEmitter();

  textStyle = {
    default: '',
    missingWord: {
      default: 'missing-word-space',
      selected: 'missing-word-space selected',
    },
  };

  constructor() {}

  ngOnInit(): void {}

  getWordStatusEnum() {
    return WordStatus;
  }

  onSingleClick(word) {
    this.preventSingleClick = false;
    const delay = 200;

    this.timer = setTimeout(() => {
      if (!this.preventSingleClick) {
        this.onWordSingleClick.emit(word);
      }
    }, delay);
  }

  onDoubleClick(word: Word) {
    this.preventSingleClick = true;
    clearTimeout(this.timer);
    this.onWordDoubleClick.emit(word);
  }

  clearSelection() {
    this.selectedOptions = [];
  }
}
