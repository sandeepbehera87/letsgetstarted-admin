import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, Observable } from 'rxjs';
import { getToken } from '../lgs-state/lgs.selector';

@Injectable({
  providedIn: 'root'
})
export class LgsPermissionGuardService {

  constructor(private router: Router, private store: Store, private route: ActivatedRoute,) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.canAccessPage();
  }

  canAccessPage(): Observable<boolean> {
    const token$ = this.store.select(getToken).pipe(
      first(),
      map(token => !!token)
    );
    return token$;
  }
}
