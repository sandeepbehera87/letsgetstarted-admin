import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'error' | 'success';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class LgsToastService {
  private readonly toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  readonly toast$ = this.toastSubject.asObservable();
  private hideTimer?: ReturnType<typeof setTimeout>;

  showError(message: string, durationMs = 5000): void {
    this.show(message, 'error', durationMs);
  }

  showSuccess(message: string, durationMs = 5000): void {
    this.show(message, 'success', durationMs);
  }

  clear(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
    this.toastSubject.next(null);
  }

  private show(message: string, type: ToastType, durationMs: number): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    this.toastSubject.next({ type, message });
    this.hideTimer = setTimeout(() => this.clear(), durationMs);
  }
}