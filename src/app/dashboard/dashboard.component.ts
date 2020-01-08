import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from '../../core/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  disableAdd = false;
  showAddQuestions = true;
  disableView = true;
  showSavedQuestions = false;
  courseList$ = this.apiService.getQueations();
  userEmail: string;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.userEmail = ''; //this.route.snapshot.paramMap.get('email');
  }

  getQuestions = () => {
    this.apiService.getQueations().subscribe(
      res => {
        this.courseList$ = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
      },
    );
  };

  tabChange = () => {
    this.disableAdd = !this.disableAdd;
    this.disableView = !this.disableView;
    this.showSavedQuestions = this.showAddQuestions;
    this.showAddQuestions = !this.showSavedQuestions;
  };
}
