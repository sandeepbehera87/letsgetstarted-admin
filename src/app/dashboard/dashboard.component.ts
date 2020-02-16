import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from '../../core/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  courseList$ = this.apiService.getQueations();
  userEmail: string;
  pagename: string;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const key = 'pagename';
    this.userEmail = '';
    this.route.queryParams.subscribe(params => {
      this.pagename = params[key];
    });
  }
}
