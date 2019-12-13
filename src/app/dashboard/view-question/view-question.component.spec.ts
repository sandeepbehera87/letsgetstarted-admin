import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ModalModule} from 'ngx-bootstrap';
import {ModalComponent} from '../../../components/modal/modal.component';
import {ViewQuestionComponent} from './view-question.component';

xdescribe('ViewQuestionComponent', () => {
  let component: ViewQuestionComponent;
  let fixture: ComponentFixture<ViewQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      declarations: [ModalComponent, ViewQuestionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
