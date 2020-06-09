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

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | import('@angular/router').UrlTree
    | Observable<boolean | import('@angular/router').UrlTree>
    | Promise<boolean | import('@angular/router').UrlTree> {
    let token = '';
    const key = 'login';
    this.store.subscribe(appstate => {
      token = appstate[key] && appstate[key].LoginData ? appstate[key].LoginData.token : '';
    });
    if (token) {
      return true;
    }
    // navigate to login page
    this.router.navigate(['login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
