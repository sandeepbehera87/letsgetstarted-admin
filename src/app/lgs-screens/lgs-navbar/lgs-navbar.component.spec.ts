import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgsNavbarComponent } from './lgs-navbar.component';

describe('LgsNavbarComponent', () => {
  let component: LgsNavbarComponent;
  let fixture: ComponentFixture<LgsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgsNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
