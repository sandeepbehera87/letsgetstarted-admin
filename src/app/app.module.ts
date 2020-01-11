import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap';
import {HttpInterceptorProviders} from '../core/http-interceptors';
import {SharedService} from '../core/shared/shared.service';
import {ErrorHandlerService} from '../core/http-error-handling/error-handler.service';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [SharedService, HttpInterceptorProviders, ErrorHandlerService]
})
export class AppModule {}
