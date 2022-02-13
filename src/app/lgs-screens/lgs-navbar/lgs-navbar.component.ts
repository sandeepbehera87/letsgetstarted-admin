import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lgs-navbar',
  templateUrl: './lgs-navbar.component.html',
  styleUrls: ['./lgs-navbar.component.css']
})
export class LgsNavbarComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  }

  navClick(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }

}
