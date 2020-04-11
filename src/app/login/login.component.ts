import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginData } from "../model/logindata";
import { AppState } from "../reducers";
import { Store } from "@ngrx/store";
import * as LoginAction from './login.actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from "@ngrx/effects";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {

  authenticated$: Observable<any>;
  private unsubscribe: Subject<void> = new Subject();

  @ViewChild("login") loginForm;

  hide = true;
  loginData: LoginData = {
    email: "",
    password: "",
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
    private action$: Actions
  ) {
    this.authenticated$ = this.action$.pipe(
      ofType(LoginAction.LoginActionTypes.USER_LOGIN_SUCCESS)
    );
  }

  ngOnInit() {
    this.authenticated$
    .pipe(
      takeUntil(this.unsubscribe)
    )
    .subscribe(() => {
      this.spinner.hide();
      this.router.navigate(["add-questions"]);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  
  onLogIn() {
    this.spinner.show();
    this.store.dispatch(new LoginAction.Login(this.loginData));
  }
}
