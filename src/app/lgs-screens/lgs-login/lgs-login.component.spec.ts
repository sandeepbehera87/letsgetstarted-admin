import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { LgsLoginComponent } from './lgs-login.component';

describe('LgsLoginComponent', () => {
  let component: LgsLoginComponent;
  let fixture: ComponentFixture<LgsLoginComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    formBuilder = new FormBuilder();
    await TestBed.configureTestingModule({
      declarations: [ LgsLoginComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.form = formBuilder.group({
      email: null,
      password: null
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define form control', () => {
    expect(component.f).toBeDefined();
  });
});
