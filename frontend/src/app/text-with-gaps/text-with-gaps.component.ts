import { Component, OnInit } from '@angular/core';
import { TextWithGaps } from '../model/text-with-gaps';
import { textWithGapsMock } from '../mock-data/text-with-gaps.data';
import { TextService } from '../text.service';

@Component({
  selector: 'app-text-with-gaps',
  templateUrl: './text-with-gaps.component.html',
  styleUrls: ['./text-with-gaps.component.less']
})
export class TextWithGapsComponent implements OnInit {
  textData: TextWithGaps = textWithGapsMock;
  WORD_PLACEHOLDER = 'xxxxxx';
  missingWordStyles = {
    default: 'word-box',
    selected: 'word-box selected'
  };
  textStyles = {
    existingWord: {
      default: 'word-box'
    },
    missingWord: {
      default: 'missing-word-space',
      selected: 'missing-word-space selected'
    }
  };

  missingWordActiveStyle: string;
  selectedMissingWord: number;
  selectedMissingWordSpace: number;

  constructor(private textService: TextService) {
    this.missingWordActiveStyle = this.missingWordStyles.default;
  }

  onMissingWordSpaceClick(i, word) {
    if (!word) {
      this.textService.selectMissingWordPosition(i);
      this.selectedMissingWordSpace = i;
    }
  }

  onMissingWordClick(i, word) {
    this.textService.selectMissingWord(word);
    this.missingWordActiveStyle = this.missingWordStyles.selected;
    this.selectedMissingWord = i;
  }

  getTextStyleClass(i, word) {
    if (word) {
      return this.textStyles.existingWord.default;
    } else {
      return i === this.selectedMissingWordSpace
        ? this.textStyles.missingWord.selected
        : this.textStyles.missingWord.default;
    }
  }

  onCheckClick() {
    if (
      this.textService.getMissingWord() &&
      this.textService.getMissingWordPosition()
    ) {
      // this.textService.checkText();
    }
  }

  ngOnInit(): void {}
}
