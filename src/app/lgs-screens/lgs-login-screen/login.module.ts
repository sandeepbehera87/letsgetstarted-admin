import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../lgs-shared/shared.module';
import { LoginComponent } from './login.component';
import { reducers, loginFeatureKey, LoginEffects } from './login-state';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
    StoreModule.forFeature(loginFeatureKey, reducers),
    EffectsModule.forFeature([LoginEffects]),
  ],
})
export class LoginModule {}
