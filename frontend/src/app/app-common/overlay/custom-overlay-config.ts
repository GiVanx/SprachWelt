import { OverlayConfig } from '@angular/cdk/overlay';

export class CustomOverlayConfig extends OverlayConfig {
  closeOnBackdropClick: boolean;
  data: any;
}
