import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {ApiInterceptor} from './api-interceptor';

/** Http interceptor providers in outside-in order */
export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
];
