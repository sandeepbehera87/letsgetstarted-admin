import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgsAddQuestionsComponent } from './lgs-add-questions.component';

describe('LgsAddQuestionsComponent', () => {
  let component: LgsAddQuestionsComponent;
  let fixture: ComponentFixture<LgsAddQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgsAddQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LgsAddQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
