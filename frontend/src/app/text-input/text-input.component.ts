import { Component, OnInit } from '@angular/core';
import { GameFacade } from '../state/game.facade';
import { Router } from '@angular/router';
import { filter, first, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.less'],
})
export class TextInputComponent implements OnInit {
  text: string;

  constructor(
    private gameFacade: GameFacade,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.gameFacade
      .selectActiveGameId()
      .pipe(first())
      .subscribe((id) => {
        if (!id) {
          this.dialog.open(NewGameDialogComponent);
        }
      });
  }

  onDialogNoClick() {}

  onDialogYesClick() {}

  onPlay() {
    console.log('ON PLAY', this.text);
    // TODO: change this length logic
    if (this.text.length > 0) {
      this.gameFacade.createGameRequest(this.text);
      this.router.navigate(['/text-fill']);
    }
  }
}
