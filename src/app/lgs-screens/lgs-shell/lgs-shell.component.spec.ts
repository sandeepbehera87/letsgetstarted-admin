import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgsShellComponent } from './lgs-shell.component';

describe('LgsShellComponent', () => {
  let component: LgsShellComponent;
  let fixture: ComponentFixture<LgsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgsShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
