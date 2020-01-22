import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then(m => m.RegisterModule),
    data: {preload: true}, // preload flag
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    data: {preload: true}, // preload flag
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {preload: true}, // preload flag
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('../core/shared/shared.module').then(m => m.SharedModule),
    data: {preload: true}, // preload flag
  },
  {
    path: 'session-expire',
    loadChildren: () =>
      import('../core/shared/shared.module').then(m => m.SharedModule),
    data: {preload: true}, // preload flag
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
