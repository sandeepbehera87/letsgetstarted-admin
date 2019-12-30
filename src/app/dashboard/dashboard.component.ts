import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
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
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.userEmail = this.route.snapshot.paramMap.get('email');
  }

  tabChange() {
    this.disableAdd = !this.disableAdd;
    this.disableView = !this.disableView;
    this.showSavedQuestions = this.showAddQuestions;
    this.showAddQuestions = !this.showSavedQuestions;
  }
}
