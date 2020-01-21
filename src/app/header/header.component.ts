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
    this.store.subscribe(state => {
      this.isLoggedIn$.next(!!state['login'].token);
      this.isLoggedOut$.next(!state['login'].token);
    });
  }

  goToRegisterPage = () => {
    this.router.navigate(['register']);
  };

  gotToLoginPage = () => {
    this.router.navigate(['login']);
  };

  goToAddQuestion = () => {
    this.router.navigate(['dashboard'], {
      queryParams: {pagename: 'addQuestion'},
    });
  };

  gotToViewQuestion = () => {
    this.router.navigate(['dashboard'], {
      queryParams: {pagename: 'viewQuestion'},
    });
  };

  signOut() {
    /*this.authService.signOut().then(
      res => {
        this.router.navigate(['login']);
      },
      err => {
        console.error(err);
      },
    );*/
  }
}
