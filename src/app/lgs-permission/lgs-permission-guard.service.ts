import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, Observable, of } from 'rxjs';
import { LgsAuthService } from '../lgs-state/lgs-auth/lgs-auth.service';
import { getToken } from '../lgs-state/lgs.selector';

@Injectable({
  providedIn: 'root'
})
export class LgsPermissionGuardService {

  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
    private authService: LgsAuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.canAccessPage();
  }

  canAccessPage(): Observable<boolean> {
    if (this.authService.snapshot.isLoggedIn) {
      return of(true);
    }

    return this.store.select(getToken).pipe(
      first(),
      map((token) => !!token),
    );
  }
}
