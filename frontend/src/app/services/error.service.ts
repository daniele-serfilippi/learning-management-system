import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getClientErrorMessage(error: Error): string {
    let errorMessage = error.message ? error.message : error.toString();

    if (error.networkError && error.networkError.error && error.networkError.error.errors) {
      error.networkError.error.errors.forEach(element => {
        errorMessage += ' | ' + element.message;
      });
    }

    return errorMessage;
  }

  getClientStack(error: Error): string {
    return error.stack;
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    let message = error.message;

    if (error.error && error.error.errors) {
      error.error.errors.forEach(element => {
        message += ' - ' + element.message;
      });
    }

    return navigator.onLine ? error.message : 'No Internet Connection';
  }

  getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
  }
}
