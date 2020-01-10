import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {FooterComponent} from '../footer/footer.component';
import {SharedModule} from '../../core/shared/shared.module';
import {AddQuestionComponent} from './add-question/add-question.component';
import {ViewQuestionComponent} from './view-question/view-question.component';
import {AuthGuardService} from '../../core/guards/auth-guard.service';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    AddQuestionComponent,
    ViewQuestionComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
  ],
  providers: [AuthGuardService],
})
export class DashboardModule {}
