import { OverlayRef } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class OverlayControl {
  subject: Subject<any> = new Subject();

  constructor(private overlayRef: OverlayRef) {}

  close(data: any = null): void {
    this.overlayRef.dispose();
    this.subject.next(data);
    this.subject.complete();
  }

  afterClosed() {
    return this.subject.asObservable();
  }
}
