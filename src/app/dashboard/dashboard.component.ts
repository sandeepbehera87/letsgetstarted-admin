import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../core/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showSavedQuestions = false;
  showAddQuestions = true;
  disableAdd: boolean;
  disableView: boolean;
  courseList$ = this.apiService.getQueations();
  userEmail: string;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.disableView = true;
    this.disableAdd = false;
    this.userEmail = this.route.snapshot.paramMap.get('email');
  }

  addQuestion() {
    this.disableView = true;
    this.disableAdd = false;
    this.showSavedQuestions = false;
    this.showAddQuestions = true;
  }

  viewQuestion() {
    this.spinner.show();
    this.disableView = false;
    this.disableAdd = true;
    this.showSavedQuestions = true;
    this.showAddQuestions = false;
  }

}
