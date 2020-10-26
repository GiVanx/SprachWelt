import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerOverlayService {
  private spinnerRef: OverlayRef = this.createSpinner();

  constructor(private overlay: Overlay) {}

  private createSpinner() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
  }

  showSpinner() {
    this.spinnerRef.attach(new ComponentPortal(MatSpinner));
  }

  stopSpinner() {
    this.spinnerRef.detach();
  }
}
