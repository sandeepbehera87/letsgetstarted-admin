import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../lgs-shared/shared.module';
import { AddQuestionsComponent } from './add-questions.component';

const routes: Routes = [{ path: '', component: AddQuestionsComponent }];

@NgModule({
  declarations: [AddQuestionsComponent],
  imports: [SharedModule.forRoot(), RouterModule.forChild(routes)],
})
export class AddQuestionsModule {}
