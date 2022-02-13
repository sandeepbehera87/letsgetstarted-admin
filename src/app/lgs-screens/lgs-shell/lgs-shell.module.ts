import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'ngx-bootstrap/modal';

import { LgsAddQuestionsComponent } from '../lgs-add-questions/lgs-add-questions.component';
import { LgsDashboardComponent } from '../lgs-dashboard/lgs-dashboard.component';
import { LgsLandingComponent } from '../lgs-landing/lgs-landing.component';
import { LgsLoginComponent } from '../lgs-login/lgs-login.component';
import { LgsNavbarComponent } from '../lgs-navbar/lgs-navbar.component';
import { LgsViewQuestionsComponent } from '../lgs-view-questions/lgs-view-questions.component';
import { HttpInterceptorProviders } from '../../lgs-api/lgs-api-interceptor';
import { LgsUserEntryComponent } from '../lgs-user-entry/lgs-user-entry.component';
import { LgsSignupComponent } from '../lgs-signup/lgs-signup.component';
import { appMetaReducers, reducers } from '../../lgs-state/lgs.reducer';
import { LgsSharedModalComponent } from '../../lgs-shared/lgs-shared-modal/lgs-shared-modal.component';

const routes: Routes = [
    { path: '', component: LgsLandingComponent },
    { path: 'dashboard', component: LgsDashboardComponent },
    { path: 'dashboard/addquestion', component: LgsAddQuestionsComponent },
    { path: 'dashboard/viewquestion', component: LgsViewQuestionsComponent }
];

@NgModule({
  declarations: [
      LgsLandingComponent,
      LgsLoginComponent,
      LgsNavbarComponent,
      LgsUserEntryComponent,
      LgsSignupComponent,
      LgsDashboardComponent,
      LgsAddQuestionsComponent,
      LgsViewQuestionsComponent,
      LgsSharedModalComponent
    ],
    exports: [
        LgsLoginComponent,
        LgsNavbarComponent
    ],
  imports: [
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forFeature('lgs-app-state', reducers, { metaReducers: appMetaReducers }),
    ModalModule.forRoot()
  ],
  providers: [HttpInterceptorProviders]
})
export class ShellModule {}
