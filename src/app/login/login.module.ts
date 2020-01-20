import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../core/shared/shared.module';
import {LoginComponent} from './login.component';
import {StoreModule} from '@ngrx/store';
import * as fromLogin from './reducers';

const routes: Routes = [{path: '', component: LoginComponent}];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromLogin.loginFeatureKey, fromLogin.loginReducer),
  ],
})
export class LoginModule {}
