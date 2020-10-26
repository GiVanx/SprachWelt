import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GameFacade } from '../../state/game.facade';
import { Word } from '../../model/word';
import { UiStore } from '../../state/ui.store';
import { WordDisplayComponent } from '../../app-common/word-display/word-display.component';

@Component({
  selector: 'app-text-with-gaps',
  templateUrl: './text-with-gaps.component.html',
  styleUrls: ['./text-with-gaps.component.less'],
})
export class TextWithGapsComponent implements OnInit {
  textWithGaps$: Observable<Word[]>;
  selectedGapIndex$: Observable<number>;

  @ViewChild('wordsDisplay') wordsDisplayComponent: WordDisplayComponent;

  constructor(private textStore: GameFacade, private uiStore: UiStore) {}

  ngOnInit(): void {
    this.textWithGaps$ = this.textStore.selectAllTextWithGaps();

    this.uiStore.getSelectedTextGapId().subscribe((selected) => {
      if (selected === null && this.wordsDisplayComponent) {
        this.wordsDisplayComponent.clearSelection();
      }
    });
  }

  onWordSelectionChange(word: Word) {
    this.uiStore.setSelectedTextGapId(word.id);
  }

  onWordDoubleClick(word) {
    this.textStore.moveWordFromTextGapToMissingWords(word);
    this.uiStore.clearSelection();
  }
}
