import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppSettings} from '../utils/app.settings';

@Injectable()
export class QuestionsApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const appReq = req.clone({
      url: AppSettings.API_ENDPOINT + req.url
    });
    return next.handle(appReq);
  }
}
