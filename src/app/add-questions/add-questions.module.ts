import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AddQuestionsComponent} from './add-questions.component';
import {SharedModule} from '../../core/shared/shared.module';

const routes: Routes = [{path: '', component: AddQuestionsComponent}];

@NgModule({
  declarations: [AddQuestionsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class AddQuestionsModule {}
