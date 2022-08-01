import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess, User } from '../../lgs-state/lgs-auth/lgs.login.action';
import { LgsApiService } from '../../lgs-api/lgs-api.service';
import { getUserid } from '../../lgs-state/lgs.selector';

@Component({
  selector: 'lgs-navbar',
  templateUrl: './lgs-navbar.component.html',
  styleUrls: ['./lgs-navbar.component.css']
})
export class LgsNavbarComponent implements OnInit {
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private apiService: LgsApiService,
    ) { }

  ngOnInit(): void {
    this.store.select(getUserid).subscribe(id => {
      this.userId = id;
    });
  }

  navClick(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }

  signOut() {
    this.apiService.signOut().subscribe(() => {
      const user: User = {
        token: '',
        userId: ''
      }
      this.store.dispatch(loginSuccess({payload: user}));
      this.router.navigate(['login'], { relativeTo: this.route });
    })
  }

}
