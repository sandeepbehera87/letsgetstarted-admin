import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';

import { LgsNavbarComponent } from '../lgs-navbar/lgs-navbar.component';
import { LgsShellComponent } from './lgs-shell.component';

describe('LgsShellComponent', () => {
  let component: LgsShellComponent;
  let fixture: ComponentFixture<LgsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LgsShellComponent,
        MockComponent(LgsNavbarComponent)
      ],
      imports: [RouterTestingModule]
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
