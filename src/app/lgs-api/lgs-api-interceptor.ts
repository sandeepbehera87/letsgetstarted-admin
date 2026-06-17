import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { resolveApiUrl } from './lgs-api-url';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const appReq = req.clone({
      url: resolveApiUrl(req.url),
      withCredentials: true,
    });
    return next.handle(appReq);
  }
}

export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
];