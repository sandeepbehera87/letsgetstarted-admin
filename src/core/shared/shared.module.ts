import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import {ModalComponent} from '../../components/modal/modal.component';
import {SessionExpireComponent} from '../../app/errors/session-expire/session-expire.component';
import {NotFoundComponent} from '../../app/errors/not-found/not-found.component';
import {ToastManager} from '../toast/toast.service';
import {ErrorHandlerService} from '../http-error-handling/error-handler.service';
import {AuthService} from '../auth/auth.service';
import {HeaderComponent} from '../../app/header/header.component';
import {CustomMaterialModule} from './material.module';

@NgModule({
  imports: [CommonModule, CustomMaterialModule, MDBBootstrapModule.forRoot()],
  declarations: [
    HeaderComponent,
    ModalComponent,
    SessionExpireComponent,
    NotFoundComponent,
  ],
  exports: [
    ModalComponent,
    SessionExpireComponent,
    NotFoundComponent,
    HeaderComponent,
    CommonModule,
    FormsModule,
    CustomMaterialModule,
    MDBBootstrapModule
  ],
  providers: [
    AuthService,
    ToastManager,
    ErrorHandlerService,
  ],
})
export class SharedModule {}
