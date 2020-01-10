import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {HeaderComponent} from './header.component';
import {environment} from '../../environments/environment';
import {AppRoutingModule} from '../app-routing.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AppRoutingModule,
      ],
      declarations: [HeaderComponent],
      providers: [AngularFireAuth, AngularFireDatabase],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
