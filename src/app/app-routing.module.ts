import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('../core/shared/shared.module').then(m => m.SharedModule),
  },
  {
    path: 'session-expire',
    loadChildren: () =>
      import('../core/shared/shared.module').then(m => m.SharedModule),
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
