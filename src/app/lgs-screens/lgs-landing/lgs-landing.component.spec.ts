import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgsLandingComponent } from './lgs-landing.component';

describe('LgsLandingComponent', () => {
  let component: LgsLandingComponent;
  let fixture: ComponentFixture<LgsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgsLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
