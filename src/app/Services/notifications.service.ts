import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string | undefined, title: string | undefined) {
    this.toastr.success(message, title, {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }
  showInfo(message: string | undefined, title: string | undefined) {
    this.toastr.info(message, title, {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }
  showError(message: string | undefined, title: string | undefined) {
    this.toastr.error(message, title, {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }
}
