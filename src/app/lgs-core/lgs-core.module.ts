import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import { reducers, appMetaReducers } from '../lgs-app-state/reducer';
import { HttpInterceptorProviders } from './lgs-http-interceptors';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    StoreModule.forRoot(reducers, { metaReducers: appMetaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
  ],
  exports: [],
  providers: [HttpInterceptorProviders],
})
export class CoreModule {}
