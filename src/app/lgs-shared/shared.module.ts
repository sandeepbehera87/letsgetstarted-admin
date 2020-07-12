import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// TODO : Remove FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ModalComponent } from '../lgs-components/lgs-modal/modal.component';
import { SessionExpireComponent } from '../lgs-components/lgs-errors/lgs-session-expire-page/session-expire.component';
import { NotFoundComponent } from '../lgs-components/lgs-errors/lgs-not-found-page/not-found.component';
import { ErrorHandlerService } from '../lgs-core/lgs-http-error-handling/error-handler.service';
import { AuthService } from '../lgs-core/lgs-auth-service/auth.service';
import { HeaderComponent } from '../lgs-components/lgs-header/header.component';
import { FooterComponent } from '../lgs-components/lgs-footer/footer.component';
import { CustomMaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    SessionExpireComponent,
    NotFoundComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    SessionExpireComponent,
    NotFoundComponent,
    ReactiveFormsModule,
    MDBBootstrapModule,
    CustomMaterialModule,
    ToastrModule,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
        ngModule: SharedModule,
        providers: [
            AuthService,
            { provide: ToastrService, useClass: ToastrService },
            ErrorHandlerService,
        ],
    };
}
}
