import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LgsToastService, ToastMessage } from './lgs-toast.service';

@Component({
  standalone: false,
  selector: 'lgs-toast',
  templateUrl: './lgs-toast.component.html',
  styleUrls: ['./lgs-toast.component.css'],
})
export class LgsToastComponent implements OnInit, OnDestroy {
  toast: ToastMessage | null = null;
  private sub?: Subscription;

  constructor(
    private toastService: LgsToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.sub = this.toastService.toast$.subscribe((toast) => {
      this.toast = toast;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  dismiss(): void {
    this.toastService.clear();
  }
}