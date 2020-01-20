import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/reducers';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router, private store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | import('@angular/router').UrlTree
    | Observable<boolean | import('@angular/router').UrlTree>
    | Promise<boolean | import('@angular/router').UrlTree> {
    let token = '';
    this.store.subscribe(state => {
      token = state['login'].token;
    });
    if (token) {
      return true;
    }
    // navigate to login page
    this._router.navigate(['login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
