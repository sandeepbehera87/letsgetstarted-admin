import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';

import {AuthService} from '../core/auth/auth.service';
import {ToastManager} from '../core/toast/toast.service';

import {HttpInterceptorProviders} from '../core/http-interceptors/index';
import {ErrorHandlerService} from '../core/http-error-handling/error-handler.service';
import {SharedService} from '../core/shared/shared.service';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {SessionExpireComponent} from './errors/session-expire/session-expire.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, SessionExpireComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
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
  providers: [
    AuthService,
    ToastManager,
    HttpInterceptorProviders,
    ErrorHandlerService,
    SharedService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
