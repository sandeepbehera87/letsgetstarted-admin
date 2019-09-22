import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    constructor(
      public afAuth: AngularFireAuth,
      private spinner: NgxSpinnerService,
      public db: AngularFireDatabase
    ) { }
  
    actionCodeSettings = {
      url: 'https://letsgetstarted-admin.herokuapp.com/',
      handleCodeInApp: true,
    };
  
    static isEmailVerified() {
      const user = firebase.auth().currentUser;
      if (!user || user === null) {
        return false;
      }
      return user.emailVerified;
    }
  
    userRegistration(userData) {
      this.spinner.show();
      return new Promise<any>((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(userData.signupEmail, userData.signupPassword)
          .then(res => {
            this.spinner.hide();
            resolve(res);
          }, err => {
            this.spinner.hide();
            reject(err);
          });
      });
    }
  
    verifyEmail() {
      this.spinner.show();
      return new Promise<any>((resolve, reject) => {
        const user = firebase.auth().currentUser;
        user.sendEmailVerification().then((res) => {
          this.spinner.hide();
          resolve(res);
        }).catch((error) => {
          this.spinner.hide();
          reject(error);
        });
      });
    }
  
    signIn(signInData) {
      this.spinner.show();
      return new Promise<any>((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(signInData.email, signInData.password)
          .then((res) => {
            this.spinner.hide();
            resolve(res);
          }).catch((error) => {
            this.spinner.hide();
            reject(error);
          });
      });
    }
  
    signOut() {
      this.spinner.show();
      return new Promise<any>((resolve, reject) => {
        firebase.auth().signOut()
          .then((res) => {
            this.spinner.hide();
            resolve(res);
          }).catch((error) => {
            this.spinner.hide();
            reject(error);
          });
      });
    }
  }
  
