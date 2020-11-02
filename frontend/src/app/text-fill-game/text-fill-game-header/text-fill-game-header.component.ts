import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CancelGameDialogComponent } from 'src/app/cancel-game-dialog/cancel-game-dialog.component';
import { GameStatus } from 'src/app/model/game-status';
import { WordStatus } from 'src/app/model/word-status';
import { SpinnerOverlayService } from 'src/app/service/spinner-overlay.service';
import { TaskSuccessDialogComponent } from 'src/app/task-success-dialog/task-success-dialog.component';
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
  textReadyToCheck$: Observable<boolean>;

  constructor(
    private gameFacade: GameFacade,
    private dialog: MatDialog,
    private router: Router,
    private spinnerOverlayService: SpinnerOverlayService
  ) {}

  ngOnInit(): void {
    this.levels = new Array(this.MAX_COUNT_LEVELS).fill(0).map((x, i) => i + 1);
    this.activeGameStatus$ = this.gameFacade.selectActiveGame().pipe(
      filter((game) => !!game),
      map((game) => game.status)
    );
    this.textReadyToCheck$ = this.gameFacade.selectTextReadyToCheck();
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
    this.gameFacade.checkWords().subscribe((words) => {
      if (words.filter((w) => w.status !== WordStatus.OK).length === 0) {
        const diag = this.dialog.open(TaskSuccessDialogComponent);
        diag.afterClosed().subscribe((result) => {
          if (result === 'home') {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['text']);
          }
        });
      }
      this.spinnerOverlayService.stopSpinner();
    });
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
