import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lgs-user-entry',
  templateUrl: './lgs-user-entry.component.html',
  styleUrls: ['./lgs-user-entry.component.css']
})
export class LgsUserEntryComponent implements OnInit {
  hideSignUp = true;

  constructor() { }

  ngOnInit(): void {
  }

  onUserAction(evt: any) {
    this.hideSignUp = evt !== 'signUp';
  }

}
