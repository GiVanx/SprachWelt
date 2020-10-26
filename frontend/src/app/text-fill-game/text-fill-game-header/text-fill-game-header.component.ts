import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { CancelGameDialogComponent } from 'src/app/cancel-game-dialog/cancel-game-dialog.component';
import { GameStatus } from 'src/app/model/game-status';
import { SpinnerOverlayService } from 'src/app/service/spinner-overlay.service';
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
  activeGameStatus$: Observable<GameStatus>;

  constructor(
    private gameFacade: GameFacade,
    private dialog: MatDialog,
    private router: Router,
    private spinnerOverlayService: SpinnerOverlayService
  ) {}

  ngOnInit(): void {
    this.levels = new Array(this.MAX_COUNT_LEVELS).fill(0).map((x, i) => i + 1);
    this.activeGameStatus$ = this.gameFacade.selectActiveGameStatus();
  }

  gameStatus() {
    return GameStatus;
  }

  onRemix($event) {
    this.spinnerOverlayService.showSpinner();
    this.gameFacade
      .remixGameRequest(this.selectedLevel)
      .subscribe(() => this.spinnerOverlayService.stopSpinner());
  }

  onDifficultyChange($event) {
    this.selectedLevel = $event;
    console.log($event.value);
  }

  onStartClick() {
    this.spinnerOverlayService.showSpinner();
    this.gameFacade
      .startGameRequest()
      .subscribe(() => this.spinnerOverlayService.stopSpinner());
  }

  onCheckClick() {
    this.spinnerOverlayService.showSpinner();
    this.gameFacade
      .checkWords()
      .subscribe(() => this.spinnerOverlayService.stopSpinner());
  }

  onCancelClick() {
    let ref = this.dialog.open(CancelGameDialogComponent);
    ref
      .afterClosed()
      .pipe(
        filter((cancelGame) => cancelGame),
        take(1),
        tap(() => this.spinnerOverlayService.showSpinner()),
        switchMap(() => this.gameFacade.cancelGameRequest()),
        tap(() => this.router.navigate(['/text'])),
        tap(() => this.spinnerOverlayService.stopSpinner())
      )
      .subscribe();
  }
}
