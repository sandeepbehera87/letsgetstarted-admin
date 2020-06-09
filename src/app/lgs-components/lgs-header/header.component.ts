import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../lgs-core/lgs-auth-service/auth.service';
import {Store} from '@ngrx/store';
import { getTokenState } from '../../lgs-screens/lgs-login-screen/login-state/selector';
import * as la from '../../lgs-app-state/app.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() user: string[];

  public token$ = this.store.select<string>(getTokenState);

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
  ) {}

  goToRegisterPage = () => {
    this.router.navigate(['register']);
  }

  gotToLoginPage = () => {
    this.router.navigate(['login']);
  }

  goToAddQuestion = () => {
    this.router.navigate(['add-questions']);
  }

  gotToViewQuestion = () => {
    this.router.navigate(['view-questions']);
  }

  signOut() {
    this.authService.signOut().subscribe(
      res => {
        this.router.navigate(['login']);
        this.store.dispatch(new la.ClearState());
      },
      err => {
        console.error(err);
      },
    );
  }
}
