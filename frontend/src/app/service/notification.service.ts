import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private SUCCESS_SNACKBAR_DURATION = 5000;

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.snackBar.open(message, '', {
      duration: this.SUCCESS_SNACKBAR_DURATION,
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'X', { panelClass: ['error'] });
  }
}
