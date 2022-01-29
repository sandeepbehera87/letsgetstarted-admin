import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'lgs-login',
  templateUrl: './lgs-login.component.html',
  styleUrls: ['./lgs-login.component.css']
})
export class LgsLoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]
      }
    );
  }

  onSubmit() {
    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }
}
