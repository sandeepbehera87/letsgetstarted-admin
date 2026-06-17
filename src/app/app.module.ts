import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptorProviders } from './lgs-api/lgs-api-interceptor';
import { LgsToastComponent } from './lgs-shared/lgs-toast/lgs-toast.component';
import { appMetaReducers, reducers } from './lgs-state/lgs.reducer';
import { LgsLocalConfigService } from './lgs-shared/lgs-local-config/lgs-local-config.service';

export function initializeLocalConfig(config: LgsLocalConfigService) {
  return () => config.load();
}

@NgModule({
  declarations: [AppComponent, LgsToastComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NgxSpinnerModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('lgs-app-state', reducers, {
      metaReducers: appMetaReducers,
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    ...HttpInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLocalConfig,
      deps: [LgsLocalConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}