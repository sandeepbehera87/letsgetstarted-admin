import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LgsSharedModalComponent } from '../../lgs-shared/lgs-shared-modal/lgs-shared-modal.component';
import { Questions, QuestionSet } from '../../lgs-interface';

@Component({
  selector: 'lgs-view-questions',
  templateUrl: './lgs-view-questions.component.html',
  styleUrls: ['./lgs-view-questions.component.css']
})
export class LgsViewQuestionsComponent implements OnInit {
  @ViewChild('submitConfirmModal', { static: true })
  submitConfirmModal!: LgsSharedModalComponent;

  questions: QuestionSet[] | any;

  showCourseContainer = false;
  questionset: Questions[] | any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(res=> {
      this.questions = res['questions'];
      this.showCourseContainer = true;
    });
  }

  viewQuestionSet(_questionset: Questions[]) {
    this.questionset = _questionset;
    this.submitConfirmModal.show();
  }
}
