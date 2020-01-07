import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {SessionExpireComponent} from './errors/session-expire/session-expire.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', loadChildren: './register/register.module#RegisterModule'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {
    path: 'dashboard/:email',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: 'session-expire', component: SessionExpireComponent},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
