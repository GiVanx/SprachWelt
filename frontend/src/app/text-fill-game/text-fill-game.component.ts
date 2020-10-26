import { Component, OnInit } from '@angular/core';
import { UiStore } from '../state/ui.store';
import { combineLatest } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { GameFacade } from '../state/game.facade';

@Component({
  selector: 'app-text-fill-game',
  templateUrl: './text-fill-game.component.html',
  styleUrls: ['./text-fill-game.component.less'],
})
export class TextFillGameComponent implements OnInit {
  constructor(private uiStore: UiStore, private gameFacade: GameFacade) {}

  ngOnInit(): void {
    console.log('text fill component');

    // TODO: remove this line. It is now used only for testing with mock data.
    this.gameFacade.createGameRequest('');

    this.uiStore
      .getSelection()
      .pipe(
        filter(
          ([textGapId, missingWordId]) =>
            missingWordId !== null && textGapId !== null
        )
      )
      .subscribe(([textGapId, missingWordId]) => {
        this.gameFacade.moveWordFromMissingToTextGap(textGapId, missingWordId);
        this.uiStore.clearSelection();
      });
  }

  onCheckClick() {}
}
