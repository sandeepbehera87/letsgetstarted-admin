import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgsUserEntryComponent } from './lgs-user-entry.component';

describe('LgsUserEntryComponent', () => {
  let component: LgsUserEntryComponent;
  let fixture: ComponentFixture<LgsUserEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgsUserEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsUserEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
