import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lgs-dashboard',
  templateUrl: './lgs-dashboard.component.html',
  styleUrls: ['./lgs-dashboard.component.css']
})
export class LgsDashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  addQuestion() {
    this.router.navigate(['addquestion'], { relativeTo: this.route });
  }

  public viewQuestion() {
    this.router.navigate(['viewquestion'], { relativeTo: this.route });
  }

}
