import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getErrorMessage(error: Error | HttpErrorResponse): string {
    if (error instanceof Error) {
      return this.getClientErrorMessage(error);
    } else if (error instanceof HttpErrorResponse) {
      return this.getServerErrorMessage(error);
    }
  }

  private getClientErrorMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    return error.message;
  }
}
