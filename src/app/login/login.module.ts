import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared/shared.module';
import {LoginComponent} from './login.component';

const routes: Routes = [{path: '', component: LoginComponent}];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class LoginModule {}
