import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CancelGameDialogComponent } from 'src/app/cancel-game-dialog/cancel-game-dialog.component';
import { GameStatus } from 'src/app/model/game-status';
import { GameFacade } from '../../state/game.facade';

@Component({
  selector: 'app-text-fill-game-header',
  templateUrl: './text-fill-game-header.component.html',
  styleUrls: ['./text-fill-game-header.component.less'],
})
export class TextFillGameHeaderComponent implements OnInit {
  MAX_COUNT_LEVELS = 10;
  selectedLevel = 2;
  levels: number[];
  requestInProgress$: Observable<boolean>;
  activeGameStatus$: Observable<GameStatus>;

  constructor(private gameFacade: GameFacade, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.levels = new Array(this.MAX_COUNT_LEVELS).fill(0).map((x, i) => i + 1);
    this.requestInProgress$ = this.gameFacade.selectRequestInProgress();
    this.activeGameStatus$ = this.gameFacade.selectActiveGameStatus();
  }

  gameStatus() {
    return GameStatus;
  }

  onRemix($event) {
    this.gameFacade.remixGameRequest(this.selectedLevel);
  }

  onDifficultyChange($event) {
    this.selectedLevel = $event;
    console.log($event.value);
  }

  onStartClick() {
    this.gameFacade.startGameRequest();
  }

  onCheckClick() {
    this.gameFacade.checkWords();
  }

  onCancelClick() {
    let ref = this.dialog.open(CancelGameDialogComponent);
    ref
      .afterClosed()
      .pipe(first())
      .subscribe((gameCancelConfirmed) => {
        console.log('confirmed', gameCancelConfirmed);
        if (gameCancelConfirmed) {
          this.gameFacade.cancelGameRequest();
        }
      });
  }
}
