import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ToastrModule} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {reducers} from '../reducers';
import {HeaderComponent} from './header.component';
import {AppRoutingModule} from '../app-routing.module';
import {ErrorHandlerService} from '../../core/http-error-handling/error-handler.service';
import {ToastManager} from '../../core/toast/toast.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        HttpClientModule,
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
      declarations: [HeaderComponent],
      providers: [ErrorHandlerService, ToastManager],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
