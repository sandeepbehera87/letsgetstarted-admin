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
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/reducers';

@Injectable()
export class QuestionsApiInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    console.log('QuestionsApiInterceptor');
    let token = '';
    this.store.subscribe(state => {
      token = state['login'] ? state['login'].token : token;
    });
    const appReq = req.clone({
      url: AppSettings.API_ENDPOINT + req.url,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'api-token': token,
      }),
      withCredentials: true,
    });
    return next.handle(appReq);
  }
}
