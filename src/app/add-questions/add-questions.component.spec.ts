import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {Router} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AddQuestionsComponent} from './add-questions.component';
import {reducers} from '../reducers';
import {CustomMaterialModule} from '../../core/shared/material.module';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';

describe('AddQuestionsComponent', () => {
  let component: AddQuestionsComponent;
  let fixture: ComponentFixture<AddQuestionsComponent>;
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
        FormsModule,
        MDBBootstrapModule,
        CustomMaterialModule,
        StoreModule.forRoot(reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
      ],
      declarations: [AddQuestionsComponent, HeaderComponent, FooterComponent],
      providers: [{provide: Router, useValue: mockRouter}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
