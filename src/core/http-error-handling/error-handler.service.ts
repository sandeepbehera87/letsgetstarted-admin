import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastManager} from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  public errorMessage: string = '';

  constructor(
    private router: Router,
    private toastr: ToastManager,
    private spinner: NgxSpinnerService,
  ) {}

  public handleError(error: HttpErrorResponse) {
    this.spinner.hide();
    if (error.status === 500) {
      this.handle500Error(error);
    } else if (error.status === 404) {
      this.handle404Error(error);
    } else if (error.status === 403) {
      this.router.navigate(['session-expire']);
    } else {
      this.handleOtherError(error);
    }
  }

  private handle500Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }

  private handle404Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }

  private handleOtherError(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    //TODO: this will be fixed later;
  }

  private createErrorMessage(error: HttpErrorResponse) {
    this.errorMessage = error.error ? error.error : error.statusText;
    this.toastr.showError(this.errorMessage['error']);
  }
}
