import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { CustomMaterialModule } from '../../lgs-shared/material.module';
import { HeaderComponent } from '../../lgs-components/lgs-header/header.component';
import { ErrorHandlerService } from '../../lgs-core/lgs-http-error-handling/error-handler.service';
import { RegisterComponent } from './register.component';

xdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        HttpClientModule,
        FormsModule,
        StoreModule.forRoot({}),
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
        BrowserAnimationsModule,
        MDBBootstrapModule,
        CustomMaterialModule,
      ],
      declarations: [RegisterComponent, HeaderComponent],
      providers: [
        ErrorHandlerService,
        ToastrService,
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should return false on calling register function', () => {
    expect(component.register()).toBeFalsy();
  });
});
