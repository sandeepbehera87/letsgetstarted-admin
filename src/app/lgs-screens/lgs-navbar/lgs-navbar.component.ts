import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { LgsApiService } from '../../lgs-api/lgs-api.service';
import { AuthState, LgsAuthService } from '../../lgs-state/lgs-auth/lgs-auth.service';

@Component({
  standalone: false,
  selector: 'lgs-navbar',
  templateUrl: './lgs-navbar.component.html',
  styleUrls: ['./lgs-navbar.component.css'],
})
export class LgsNavbarComponent {
  readonly auth$: Observable<AuthState>;
  isLoggingOut = false;

  constructor(
    private router: Router,
    private authService: LgsAuthService,
    private apiService: LgsApiService,
    private spinner: NgxSpinnerService,
  ) {
    this.auth$ = this.authService.state$;
  }

  goHome(): void {
    if (this.authService.snapshot.isLoggedIn) {
      this.router.navigate(['/shell/dashboard']);
    } else {
      this.router.navigate(['/shell']);
    }
  }

  logout(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;
    this.apiService.signOut().subscribe({
      next: () => this.completeLogout(),
      error: () => this.completeLogout(),
    });
  }

  private completeLogout(): void {
    this.authService.clearSession();
    this.isLoggingOut = false;
    this.spinner.hide();
    this.router.navigate(['/shell']);
  }
}