import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lgs-shared-error-page',
  templateUrl: './lgs-shared-error-page.component.html',
  styleUrls: ['./lgs-shared-error-page.component.css']
})
export class LgsSharedErrorPageComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  backToDashboard() {
    this.router.navigate(['shell/dashboard']);
  }

}
