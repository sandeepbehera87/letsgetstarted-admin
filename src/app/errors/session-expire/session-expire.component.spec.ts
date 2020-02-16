import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {Router} from '@angular/router';
import {SessionExpireComponent} from './session-expire.component';

describe('SessionExpireComponent', () => {
  let component: SessionExpireComponent;
  let fixture: ComponentFixture<SessionExpireComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [SessionExpireComponent],
      providers: [{provide: Router, useValue: mockRouter}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionExpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login on backToLogin click', () => {
    component.backToLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });
});
