import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const appReq = req.clone({
      url: environment.api_baseurl + req.url,
      headers: req.headers,
      withCredentials: true,
    });
    return next.handle(appReq);
  }
}

export const HttpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
  ];
  