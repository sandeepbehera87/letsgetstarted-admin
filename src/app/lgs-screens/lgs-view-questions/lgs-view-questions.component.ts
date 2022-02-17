import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionSet } from '../../lgs-interface';

@Component({
  selector: 'lgs-view-questions',
  templateUrl: './lgs-view-questions.component.html',
  styleUrls: ['./lgs-view-questions.component.css']
})
export class LgsViewQuestionsComponent implements OnInit {

  questions: QuestionSet[] | any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(res=> {
      this.questions = res['questions'];
    });
  }

}
