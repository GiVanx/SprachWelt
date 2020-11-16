import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { CustomOverlayConfig } from './custom-overlay-config';
import { OverlayControl } from './overlay-control';
import { OVERLAY_DATA } from './overlay-tokens';

const DEFAULT_OVERLAY_CONFIG: CustomOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: '',
  closeOnBackdropClick: false,
  data: {},
};

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open(
    component: any,
    config: CustomOverlayConfig = DEFAULT_OVERLAY_CONFIG
  ): OverlayControl {
    const overlayConfig = { ...DEFAULT_OVERLAY_CONFIG, ...config };
    const overlayRef = this.createOverlay(overlayConfig);

    const overlayControl = new OverlayControl(overlayRef);

    if (config.closeOnBackdropClick) {
      overlayRef.backdropClick().subscribe(() => overlayControl.close());
    }

    this.attachDialogContainer(
      component,
      overlayRef,
      overlayConfig,
      overlayControl
    );

    return overlayControl;
  }

  private createOverlay(config: CustomOverlayConfig) {
    const overlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer(
    component: any,
    overlayRef: OverlayRef,
    config: CustomOverlayConfig,
    overlayControl: OverlayControl
  ) {
    const injector = this.createInjector(config, overlayControl);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(
    config: CustomOverlayConfig,
    dialogControl: OverlayControl
  ) {
    const injectionTokens = new WeakMap();

    injectionTokens.set(OverlayControl, dialogControl);
    injectionTokens.set(OVERLAY_DATA, config.data);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: CustomOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }
}
