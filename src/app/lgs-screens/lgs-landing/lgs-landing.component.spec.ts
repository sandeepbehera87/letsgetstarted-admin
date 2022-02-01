import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { LgsLoginComponent } from '../index';
import { LgsLandingComponent } from './lgs-landing.component';

describe('LgsLandingComponent', () => {
  let component: LgsLandingComponent;
  let fixture: ComponentFixture<LgsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LgsLandingComponent,
        MockComponent(LgsLoginComponent)
      ]
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
