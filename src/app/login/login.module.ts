import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../core/shared/shared.module';
import {LoginComponent} from './login.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule,Actions} from '@ngrx/effects';
import {LoginEffects}  from './login.effects';
import * as fromLogin from './reducers';

const routes: Routes = [{path: '', component: LoginComponent}];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromLogin.loginFeatureKey, fromLogin.loginReducer),
    EffectsModule.forFeature([LoginEffects])
  ],
})
export class LoginModule {}
