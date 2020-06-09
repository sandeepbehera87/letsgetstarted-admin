import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

import { CustomMaterialModule } from '../../lgs-shared/material.module';
import { HeaderComponent } from '../../lgs-components/lgs-header/header.component';
import { FooterComponent } from '../../lgs-components/lgs-footer/footer.component';
import { ModalComponent } from '../../lgs-components/lgs-modal/modal.component';
import { ViewQuestionsComponent } from './view-questions.component';

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
        StoreModule.forRoot({}),
        ModalModule.forRoot(),
      ],
      declarations: [
        ViewQuestionsComponent,
        HeaderComponent,
        FooterComponent,
        ModalComponent,
      ],
      providers: [{ provide: Router, useValue: mockRouter }, BsModalRef],
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
