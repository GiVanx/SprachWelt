import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TextStore } from '../state/text.store';
import { Word } from '../model/word';
import { WordStatus } from '../model/word-status';
import { UiStore } from '../state/ui.store';
import { WordDisplayComponent } from '../word-display/word-display.component';

@Component({
  selector: 'app-text-with-gaps',
  templateUrl: './text-with-gaps.component.html',
  styleUrls: ['./text-with-gaps.component.less'],
})
export class TextWithGapsComponent implements OnInit {
  textWithGaps$: Observable<Word[]>;
  selectedGapIndex$: Observable<number>;

  @ViewChild('wordsDisplay') wordsDisplayComponent: WordDisplayComponent;

  constructor(private textStore: TextStore, private uiStore: UiStore) {}

  ngOnInit(): void {
    this.textWithGaps$ = this.textStore.selectTextWithGaps();
    this.uiStore.getSelectedTextGapIndex().subscribe((selected) => {
      if (selected === null && this.wordsDisplayComponent) {
        this.wordsDisplayComponent.clearSelection();
      }
    });
  }

  onWordSelectionChange(wordPosition) {
    console.log('on word selection');
    this.uiStore.setSelectedTextGapIndex(wordPosition);
  }

  onWordDoubleClick(word) {
    console.log('on double click');
    this.textStore.moveWordFromTextGapToMissingWords(word);
    this.uiStore.setSelectedTextGapIndex(null);
    this.uiStore.setSelectedMissingWordIndex(null);
  }

  // onTextGapClick(event) {
  //   console.log('EVENT', event.option.value);
  //   // TODO: add functionality when the a word was already selected
  //   // in a text gap, but the user would like to replace it with another
  //   // missing word.
  // }
}
