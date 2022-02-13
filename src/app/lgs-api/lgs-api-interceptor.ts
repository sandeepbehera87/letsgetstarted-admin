import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {environment} from '../../environments/environment';
import { getToken } from '../lgs-state/lgs.selector';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let token = '';
    const key = 'login';
    this.store.select(getToken).subscribe(data => {
      token = data;
    })
    const appReq = req.clone({
      url: environment.api_baseurl + req.url,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'token': token ? token : '',
      }),
      withCredentials: true,
    });
    return next.handle(appReq);
  }
}

export const HttpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
  ];
  