import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  errorMessage;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  public handleError(error: HttpErrorResponse) {
    this.spinner.hide();
    if (error.status === 500) {
      this.createErrorMessage(error);
      this.router.navigate(['/500']);
    } else if (error.status === 404) {
      this.createErrorMessage(error);
      this.router.navigate(['/404']);
    } else if (error.status === 403) {
      this.router.navigate(['session-expire']);
    } else {
      this.handleOtherError(error);
    }
  }

  private handleOtherError(error: HttpErrorResponse) {
    this.createErrorMessage(error);
  }

  private createErrorMessage(error: HttpErrorResponse) {
    const key = 'error';
    this.errorMessage = error.error ? error.error : error.statusText;
   // this.toastr.error(this.errorMessage[key]);
  }
}
