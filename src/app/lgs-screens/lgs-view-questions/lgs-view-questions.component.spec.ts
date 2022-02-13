import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgsViewQuestionsComponent } from './lgs-view-questions.component';

describe('LgsViewQuestionsComponent', () => {
  let component: LgsViewQuestionsComponent;
  let fixture: ComponentFixture<LgsViewQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgsViewQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsViewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
