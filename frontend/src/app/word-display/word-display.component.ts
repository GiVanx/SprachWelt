import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../model/word';
import { WordStatus } from '../model/word-status';

@Component({
  selector: 'app-word-display',
  templateUrl: './word-display.component.html',
  styleUrls: ['./word-display.component.less'],
})
export class WordDisplayComponent implements OnInit {
  WORD_PLACEHOLDER = '?????';
  @Input() words: Word[];
  selectedOptions: Word[] = [];
  @Output() onWordSelectionChange: EventEmitter<number> = new EventEmitter();

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

  onNgModelChange() {
    if (this.selectedOptions.length > 0) {
      this.onWordSelectionChange.emit(this.selectedOptions[0].position);
    }
  }

  clearSelection() {
    this.selectedOptions = [];
  }

  // getTextStyleClass(word) {
  //   if (!word) {
  //     return this.textStyle.missingWord.default;
  //   } else if (word.status === WordStatus.ORIGINAL) {
  //     return this.textStyle.default;
  //   } else if (word.status === WordStatus.MISSING) {
  //     return this.textStyle.missingWord.default;
  //   } else if (word.status === WordStatus.WRONG) {
  //     // TODO: add style for word being at the wrong position in text
  //   }
  // }
}
