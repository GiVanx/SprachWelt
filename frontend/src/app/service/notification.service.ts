import { Injectable, Injector, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private SUCCESS_SNACKBAR_DURATION = 3000;
  private lastMessageId;
  private messageIsStillVisible = false;
  private dismissedSubscription: Subscription;
  private openedSubscription: Subscription;

  constructor(private snackBar: MatSnackBar) {}

  ngOnDestroy(): void {
    this.clearSnackbarSubscriptions();
  }

  showSuccess(message: string): void {
    return this.showMessage(message, this.showSuccessMessage.bind(this));
  }

  showError(message: string) {
    return this.showMessage(message, this.showErrorMessage.bind(this));
  }

  dismissError(messageId: string) {
    if (messageId === this.lastMessageId) {
      this.snackBar.dismiss();
    }
  }

  private showMessage(message: string, showFunc) {
    const messageId = this.getId(message);
    if (messageId !== this.lastMessageId || !this.messageIsStillVisible) {
      this.lastMessageId = messageId;
      showFunc(message);
    }
    return this.lastMessageId;
  }

  private addSnackBarListeners() {
    this.clearSnackbarSubscriptions();
    this.dismissedSubscription = this.snackBar._openedSnackBarRef
      .afterDismissed()
      .subscribe(() => {
        this.messageIsStillVisible = false;
      });
    this.openedSubscription = this.snackBar._openedSnackBarRef
      .afterOpened()
      .subscribe(() => {
        this.messageIsStillVisible = true;
      });
  }

  clearSnackbarSubscriptions() {
    if (this.dismissedSubscription) {
      this.dismissedSubscription.unsubscribe();
    }

    if (this.openedSubscription) {
      this.openedSubscription.unsubscribe();
    }
  }

  private showSuccessMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: this.SUCCESS_SNACKBAR_DURATION,
    });
    this.addSnackBarListeners();
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'X', { panelClass: ['error'] });
    this.addSnackBarListeners();
  }

  private getId(message: string) {
    return Md5.hashStr(message);
  }
}
