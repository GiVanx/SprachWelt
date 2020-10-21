import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { ErrorService } from './error.service';
import { LoggingService } from './logging.service';
import { NotificationService } from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse): void {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    let message = errorService.getErrorMessage(error);

    notifier.showError(message);

    logger.logError(message);

    console.error(error);
  }
}
