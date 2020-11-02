import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';
import { NotificationService } from '../service/notification.service';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';
import { GameFacade } from '../state/game.facade';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.less'],
})
export class TextInputComponent implements OnInit, AfterViewInit, OnDestroy {
  text: string = '';
  @ViewChild('f') form: NgForm;
  private errorMessageId: string;
  private MIN_NUMBER_TEXT_WORDS: number = 10;
  private statusChangesSubscription: Subscription;
  private valueChangesSubscription: Subscription;

  constructor(
    private gameFacade: GameFacade,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private spinnerOverlayService: SpinnerOverlayService
  ) {}

  ngOnInit(): void {
    this.gameFacade
      .selectActiveGameId()
      .pipe(first())
      .subscribe((id) => {
        if (id) {
          const diag = this.dialog.open(NewGameDialogComponent, {
            disableClose: true,
          });
          diag.afterClosed().subscribe((result) => {
            if (result) {
              this.cancelActiveGame();
            } else {
              this.router.navigate(['text-fill']);
            }
          });
        }
      });
  }

  cancelActiveGame() {
    this.spinnerOverlayService.showSpinner();
    this.gameFacade.cancelGameRequest().subscribe((result) => {
      this.spinnerOverlayService.stopSpinner();
    });
  }

  ngAfterViewInit(): void {
    this.addStatusChangesListener();
    this.addValueChangesListener();
  }

  ngOnDestroy(): void {
    this.statusChangesSubscription.unsubscribe();
    this.valueChangesSubscription.unsubscribe();
  }

  onBlur() {
    this.showErrors();
  }

  onDialogNoClick() {}

  onDialogYesClick() {}

  onPlay() {
    this.spinnerOverlayService.showSpinner();
    this.gameFacade.createGameRequest(this.text).subscribe(() => {
      this.spinnerOverlayService.stopSpinner();
      console.log('navigate');
      this.router.navigate(['/text-fill']);
    });
  }

  private addStatusChangesListener() {
    this.statusChangesSubscription = this.form.statusChanges.subscribe(
      (status) => {
        if (status === 'VALID') {
          this.notificationService.dismissError(this.errorMessageId);
        } else {
          this.showErrors();
        }
      }
    );
  }

  private addValueChangesListener() {
    this.valueChangesSubscription = this.form.valueChanges.subscribe(
      (value) => {
        console.log(value.text);

        const match = value.text.match(
          `\\W*\\w+(?:\\W+\\w+){${this.MIN_NUMBER_TEXT_WORDS - 1},}`
        );

        if (!match) {
          this.form.controls.text.setErrors({ pattern: true });
        }
      }
    );
  }

  private showErrors() {
    if (this.form.dirty || this.form.touched) {
      const errors: ValidationErrors = this.form.controls.text.errors;

      if (errors?.required) {
        this.errorMessageId = this.notificationService.showError(
          'Please fill the text'
        );
      } else if (errors?.pattern) {
        this.errorMessageId = this.notificationService.showError(
          `The text must contain at least ${this.MIN_NUMBER_TEXT_WORDS} words`
        );
      }
    }
  }
}
