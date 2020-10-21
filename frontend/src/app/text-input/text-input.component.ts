import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GameFacade } from '../state/game.facade';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';
import { Form, NgForm, ValidationErrors } from '@angular/forms';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.less'],
})
export class TextInputComponent implements OnInit, AfterViewInit {
  text: string = '';
  @ViewChild('f') form: NgForm;
  private errorMessageId: string;

  constructor(
    private gameFacade: GameFacade,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngAfterViewInit(): void {
    this.form.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.notificationService.dismissError(this.errorMessageId);
      } else {
        this.showErrors();
      }
    });
  }

  onBlur() {
    this.showErrors();
  }

  showErrors() {
    if (this.form.dirty || this.form.touched) {
      const errors: ValidationErrors = this.form.controls.text.errors;

      if (errors && errors.required) {
        this.errorMessageId = this.notificationService.showError(
          'Please fill the text'
        );
      }
    }
  }

  ngOnInit(): void {
    this.gameFacade
      .selectActiveGameId()
      .pipe(first())
      .subscribe((id) => {
        if (id) {
          this.dialog.open(NewGameDialogComponent);
        }
      });
  }

  onDialogNoClick() {}

  onDialogYesClick() {}

  onPlay() {
    // TODO: change this length logic
    if (this.text.length > 0) {
      this.gameFacade.createGameRequest(this.text);
      this.router.navigate(['/text-fill']);
    }
  }
}
