import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';
import {BehaviorSubject} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() user: string[];
  isLoggedIn$: BehaviorSubject<any> = new BehaviorSubject(false);
  isLoggedOut$: BehaviorSubject<any> = new BehaviorSubject(true);

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    const key = 'login';
    this.store.subscribe(state => {
      const token = state[key] ? state[key].token : '';
      this.isLoggedIn$.next(!!token);
      this.isLoggedOut$.next(!token);
    });
  }

  goToRegisterPage = () => {
    this.router.navigate(['register']);
  };

  gotToLoginPage = () => {
    this.router.navigate(['login']);
  };

  goToAddQuestion = () => {
    this.router.navigate(['add-questions']);
  };

  gotToViewQuestion = () => {
    this.router.navigate(['view-questions']);
  };

  signOut() {
    this.authService.signOut().subscribe(
      res => this.router.navigate(['login']),
      err => {
        console.error(err);
      },
    );
  }
}
