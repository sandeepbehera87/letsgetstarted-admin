import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LgsAddQuestionsComponent } from '../lgs-add-questions/lgs-add-questions.component';
import { LgsDashboardComponent } from '../lgs-dashboard/lgs-dashboard.component';
import { LgsLandingComponent } from '../lgs-landing/lgs-landing.component';
import { LgsLoginComponent } from '../lgs-login/lgs-login.component';
import { LgsNavbarComponent } from '../lgs-navbar/lgs-navbar.component';
import { LgsShellComponent } from './lgs-shell.component';
import { LgsUserEntryComponent } from '../lgs-user-entry/lgs-user-entry.component';
import { LgsSignupComponent } from '../lgs-signup/lgs-signup.component';
import { LgsPermissionGuardService } from '../../lgs-permission/lgs-permission-guard.service';
import { LgsViewQuestionResolverService } from '../lgs-dashboard/lgs-view-question-resolver.service';
import { LgsSharedErrorPageComponent } from '../../lgs-shared/lgs-shared-error-page/lgs-shared-error-page.component';

const routes: Routes = [
  {
    path: '',
    component: LgsShellComponent,
    children: [
      { path: '', component: LgsLandingComponent },
      {
        path: 'dashboard',
        component: LgsDashboardComponent,
        canActivate: [LgsPermissionGuardService],
        resolve: {
          questions: LgsViewQuestionResolverService,
        },
      },
      {
        path: 'dashboard/addquestion',
        component: LgsAddQuestionsComponent,
        canActivate: [LgsPermissionGuardService],
      },
      {
        path: 'dashboard/viewquestion',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard/error',
        component: LgsSharedErrorPageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    LgsShellComponent,
    LgsLandingComponent,
    LgsLoginComponent,
    LgsNavbarComponent,
    LgsUserEntryComponent,
    LgsSignupComponent,
    LgsDashboardComponent,
    LgsAddQuestionsComponent,
    LgsSharedErrorPageComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class ShellModule {}