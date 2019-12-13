import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from '../../core/shared/shared.module';
import {AddQuestionComponent} from './add-question/add-question.component';
import {ViewQuestionComponent} from './view-question/view-question.component';

const routes: Routes = [{path: '', component: DashboardComponent}];

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AddQuestionComponent,
    ViewQuestionComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class DashboardModule {}
