import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalComponent } from "../../components/modal/modal.component";
import { AuthService } from "../../core/auth/auth.service";
import { ToastManager } from "../../core/toast/toast.service";
import { NgxSpinnerService } from "ngx-spinner";
import { UserData } from "../model/userdata";
import { LoginData } from "../model/logindata";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  @ViewChild("login", { static: false }) loginForm;
  @ViewChild("signupForm", { static: false }) signupForm;
  @ViewChild(ModalComponent, { static: false }) modalComponent: ModalComponent;

  user: UserData = {
    signupEmail: "",
    signupMobile: "",
    signupPassword: "",
    confirmPassword: ""
  };
  loginData: LoginData = {
    email: "",
    password: ""
  };
  openSignUpModal = false;
  onSignUpSuccess = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastManager,
    private spinner: NgxSpinnerService
  ) {}

  openSignUp() {
    this.loginForm.form.reset();
    if (this.signupForm) this.signupForm.form.reset();
    this.openSignUpModal = true;
    this.onSignUpSuccess = false;
    setTimeout(() => {
      this.modalComponent.show();
    }, 500);
  }

  registerUser() {
    this.spinner.show();
    this.openSignUpModal = false;
    this.onSignUpSuccess = true;
    const userData = {
      email: this.user.signupEmail,
      mobile: this.user.signupMobile,
      password: this.user.signupPassword
    };
    this.authService.userRegistration(userData).subscribe(
      response => {
        this.modalComponent.hide();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  onLogIn() {
    this.spinner.show();
    this.authService.signIn(this.loginData).subscribe(
      response => {
        this.spinner.hide();
        this.router.navigate(["dashboard", this.loginData.email]);
      },
      error => {
        this.spinner.hide();
      }
    );
  }
}
