import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/reducers';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let token = '';
    const key = 'login';
    this.store.subscribe(state => {
      token = state[key] ? state[key].token : '';
    });
    const appReq = req.clone({
      url: environment.api_baseurl + req.url,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'api-token': token ? token : '',
      }),
      withCredentials: true,
    });
    return next.handle(appReq);
  }
}
