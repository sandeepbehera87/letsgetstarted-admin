import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgsSharedErrorPageComponent } from './lgs-shared-error-page.component';

describe('LgsSharedErrorPageComponent', () => {
  let component: LgsSharedErrorPageComponent;
  let fixture: ComponentFixture<LgsSharedErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgsSharedErrorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsSharedErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
