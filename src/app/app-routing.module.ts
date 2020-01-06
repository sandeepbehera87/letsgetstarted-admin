import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  {path: 'register', loadChildren: './register/register.module#RegisterModule'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {
    path: 'dashboard/:email',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
  {path: '**', redirectTo: '/register', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
