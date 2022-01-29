import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgsDashboardComponent } from './lgs-dashboard.component';

describe('LgsDashboardComponent', () => {
  let component: LgsDashboardComponent;
  let fixture: ComponentFixture<LgsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
