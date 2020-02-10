import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {reducers} from '../reducers';
import {HeaderComponent} from '../header/header.component';
import {DashboardComponent} from './dashboard.component';
import {AddQuestionComponent} from './add-question/add-question.component';
import {ViewQuestionComponent} from './view-question/view-question.component';
import {FooterComponent} from '../footer/footer.component';
import {ModalComponent} from '../../components/modal/modal.component';
import {AppRoutingModule} from '../app-routing.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        MDBBootstrapModule,
        AppRoutingModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
        StoreModule.forRoot(reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
      declarations: [
        HeaderComponent,
        DashboardComponent,
        AddQuestionComponent,
        ViewQuestionComponent,
        FooterComponent,
        ModalComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
