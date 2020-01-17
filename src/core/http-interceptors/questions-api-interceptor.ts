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
import {SharedService} from '../shared/shared.service';

@Injectable()
export class QuestionsApiInterceptor implements HttpInterceptor {
  // sharedService: SharedService;
  constructor(public sharedService: SharedService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const appReq = req.clone({
      url: AppSettings.API_ENDPOINT + req.url,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods':
          'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'api-token': this.sharedService.apiToken
          ? this.sharedService.apiToken
          : '',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
      }),
      withCredentials: true,
    });
    return next.handle(appReq);
  }
}
