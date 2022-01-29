import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { LgsDashboardComponent } from '../lgs-dashboard/lgs-dashboard.component';
import { LgsLandingComponent } from '../lgs-landing/lgs-landing.component';
import { LgsLoginComponent } from '../lgs-login/lgs-login.component';
import { LgsNavbarComponent } from '../lgs-navbar/lgs-navbar.component';

const routes: Routes = [
    { path: '', component: LgsLandingComponent },
    { path: 'dashboard', component: LgsDashboardComponent }
];

@NgModule({
  declarations: [
      LgsLandingComponent,
      LgsLoginComponent,
      LgsNavbarComponent
    ],
    exports: [
        LgsLoginComponent,
        LgsNavbarComponent
    ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule
  ],
})
export class ShellModule {}
