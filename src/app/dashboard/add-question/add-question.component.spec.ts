import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import {ToastrModule} from 'ngx-toastr';
import {AngularFireDatabase} from '@angular/fire/database';
import {environment} from '../../../environments/environment';
import {AddQuestionComponent} from './add-question.component';

describe('AddQuestionComponent', () => {
  let component: AddQuestionComponent;
  let fixture: ComponentFixture<AddQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-full-width',
          preventDuplicates: true,
          closeButton: true,
        }),
      ],
      declarations: [AddQuestionComponent],
      providers: [AngularFireAuth, AngularFireDatabase],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
