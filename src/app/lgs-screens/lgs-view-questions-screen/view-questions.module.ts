import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewQuestionsComponent } from './view-questions.component';
import { SharedModule } from '../../lgs-shared/shared.module';

const routes: Routes = [{ path: '', component: ViewQuestionsComponent }];

@NgModule({
  declarations: [ViewQuestionsComponent],
  imports: [CommonModule, SharedModule.forRoot(), RouterModule.forChild(routes)],
})
export class ViewQuestionsModule {}
