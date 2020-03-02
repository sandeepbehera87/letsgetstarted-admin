import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {Router} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {ViewQuestionsComponent} from './view-questions.component';
import {reducers} from '../reducers';
import {CustomMaterialModule} from '../../core/shared/material.module';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {ModalComponent} from '../../components/modal/modal.component';

describe('ViewQuestionsComponent', () => {
  let component: ViewQuestionsComponent;
  let fixture: ComponentFixture<ViewQuestionsComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
        HttpClientModule,
        BrowserAnimationsModule,
        MDBBootstrapModule,
        CustomMaterialModule,
        StoreModule.forRoot(reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
        ModalModule.forRoot(),
      ],
      declarations: [
        ViewQuestionsComponent,
        HeaderComponent,
        FooterComponent,
        ModalComponent,
      ],
      providers: [{provide: Router, useValue: mockRouter}, BsModalRef],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
