import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgsSharedModalComponent } from './lgs-shared-modal.component';

describe('LgsSharedModalComponent', () => {
  let component: LgsSharedModalComponent;
  let fixture: ComponentFixture<LgsSharedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgsSharedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsSharedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
