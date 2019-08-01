import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
  })
  export class ToastManager {
    constructor(private toastr: ToastrService) {}

    showSuccess(message: string) {
        this.toastr.success(message, 'Success');
    }

    showError(message: string) {
        this.toastr.warning(message, 'Error');
    }

    showWarning(message: string) {
        this.toastr.error(message, 'Alert')
    }

  }
