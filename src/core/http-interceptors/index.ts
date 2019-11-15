import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {QuestionsApiInterceptor} from './questions-api-interceptor';

/** Http interceptor providers in outside-in order */
export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: QuestionsApiInterceptor, multi: true},
];
