import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-session-expire',
  templateUrl: './session-expire.component.html',
  styleUrls: ['./session-expire.component.scss'],
})
export class SessionExpireComponent {
  constructor(private router: Router) {}

  backToLogin = () => {
    this.router.navigate(['login']);
  };
}
