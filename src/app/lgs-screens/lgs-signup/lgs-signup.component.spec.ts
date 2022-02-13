import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgsSignupComponent } from './lgs-signup.component';

describe('LgsSignupComponent', () => {
  let component: LgsSignupComponent;
  let fixture: ComponentFixture<LgsSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgsSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
