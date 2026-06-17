import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Questions, QuestionSet } from '../../lgs-interface';

@Component({
  standalone: false,
  selector: 'lgs-view-questions',
  templateUrl: './lgs-view-questions.component.html',
  styleUrls: ['./lgs-view-questions.component.css']
})
export class LgsViewQuestionsComponent implements OnInit {
  questions: QuestionSet[] | any;

  showCourseContainer = false;
  questionset: Questions[] | any;
  showSet = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(res=> {
      this.questions = res['questions'];
      this.showCourseContainer = true;
    });
  }

  viewQuestionSet(_questionset: Questions[]) {
    this.questionset = _questionset;
    this.showSet = true;
  }

  closeSet() {
    this.showSet = false;
    this.questionset = null;
  }
}
