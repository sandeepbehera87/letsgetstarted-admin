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
    path: 'add-questions',
    loadChildren: () =>
      import('./add-questions/add-questions.module').then(
        m => m.AddQuestionsModule,
      ),
  },
  {
    path: 'viewQuestions',
    loadChildren: () =>
      import('./view-questions/view-questions.module').then(
        m => m.ViewQuestionsModule,
      ),
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
