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
import { LgsLocalConfigService } from '../lgs-shared/lgs-local-config/lgs-local-config.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private localConfig: LgsLocalConfigService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const shouldRewrite =
      !/^https?:\/\//i.test(req.url) &&
      !req.url.startsWith('/assets/') &&
      !req.url.startsWith('assets/');

    const appReq = shouldRewrite
      ? req.clone({
          url: resolveApiUrl(req.url, this.localConfig.apiBaseUrl),
          withCredentials: true,
        })
      : req.clone({ withCredentials: true });

    return next.handle(appReq);
  }
}

export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
];