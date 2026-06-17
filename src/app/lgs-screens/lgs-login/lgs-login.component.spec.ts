import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// ts-mockery removed during Jest → Vitest migration; using plain object for ActivatedRoute

import { LgsLoginComponent } from './lgs-login.component';

describe('LgsLoginComponent', () => {
  let component: LgsLoginComponent;
  let fixture: ComponentFixture<LgsLoginComponent>;
  let formBuilder: FormBuilder;
  let router: any;
  let activatedRoute: any;

  beforeEach(async () => {
    formBuilder = new FormBuilder();
    router = {
      navigate: vi.fn()
    };
    activatedRoute = { snapshot: { paramMap: { get: () => null } } } as any;
    await TestBed.configureTestingModule({
      declarations: [LgsLoginComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.form = formBuilder.group({
      email: null,
      password: null
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define form control', () => {
    expect(component.f).toBeDefined();
  });

  describe('onSubmit', () => {
    it('should nagivate to dashboard', () => {
      component.onSubmit();
      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
