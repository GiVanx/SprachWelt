import { Component, OnInit } from '@angular/core';
import { UiStore } from '../state/ui.store';
import { combineLatest } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { TextStore } from '../state/text.store';

@Component({
  selector: 'app-text-fill-game',
  templateUrl: './text-fill-game.component.html',
  styleUrls: ['./text-fill-game.component.less'],
})
export class TextFillGameComponent implements OnInit {
  constructor(private uiStore: UiStore, private textStore: TextStore) {}

  ngOnInit(): void {
    //TODO: remove this line. It is now used only for testing.
    this.textStore.addTextRequest('');

    combineLatest([
      this.uiStore.getSelectedMissingWordIndex(),
      this.uiStore.getSelectedTextGapIndex(),
    ])
      .pipe(
        filter(
          ([missingWordIndex, textGapIndex]) =>
            missingWordIndex !== null && textGapIndex !== null
        )
      )
      .subscribe(([missingWordIndex, textGapIndex]) => {
        console.log('mi', missingWordIndex, 'ti', textGapIndex);
        if (missingWordIndex !== null && textGapIndex !== null) {
          this.textStore.moveWordFromMissingToTextGap(
            textGapIndex,
            missingWordIndex
          );

          this.uiStore.clearSelection();
        }
      });
  }

  onCheckClick() {}
}
