import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CustomMaterialModule} from '../../core/shared/material.module';

import {RegisterComponent} from './register.component';

const routes: Routes = [{path: '', component: RegisterComponent}];

@NgModule({
  declarations: [RegisterComponent],
  imports: [CustomMaterialModule, FormsModule, RouterModule.forChild(routes)],
})
export class RegisterModule {}
