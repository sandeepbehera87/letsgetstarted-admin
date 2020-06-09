import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './lgs-core/lgs-permissions-guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./lgs-screens/lgs-register-screen/register.module').then(
        (m) => m.RegisterModule
      ),
    data: { preload: true }, // preload flag
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./lgs-screens/lgs-login-screen/login.module').then(
        (m) => m.LoginModule
      ),
    data: { preload: true }, // preload flag
  },
  {
    path: 'add-questions',
    loadChildren: () =>
      import(
        './lgs-screens/lgs-add-questions-screen/add-questions.module'
      ).then((m) => m.AddQuestionsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'view-questions',
    loadChildren: () =>
      import(
        './lgs-screens/lgs-view-questions-screen/view-questions.module'
      ).then((m) => m.ViewQuestionsModule),
    data: { preload: true }, // preload flag
    canActivate: [AuthGuard],
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./lgs-shared/shared.module').then((m) => m.SharedModule),
    data: { preload: true }, // preload flag
    canActivate: [AuthGuard],
  },
  {
    path: 'session-expire',
    loadChildren: () =>
      import('./lgs-shared/shared.module').then((m) => m.SharedModule),
    data: { preload: true }, // preload flag
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
