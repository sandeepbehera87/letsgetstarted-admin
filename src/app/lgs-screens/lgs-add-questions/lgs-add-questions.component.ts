import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LgsApiService } from 'src/app/lgs-api/lgs-api.service';
import { LgsSharedModalComponent } from '../../lgs-shared/lgs-shared-modal/lgs-shared-modal.component';

export interface Questions {
  quetionTitle: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
}

export interface QuestionSet {
  coursename: string,
  subject: string
  questionset: Questions[]
}

@Component({
  selector: 'lgs-add-questions',
  templateUrl: './lgs-add-questions.component.html',
  styleUrls: ['./lgs-add-questions.component.css']
})
export class LgsAddQuestionsComponent implements OnInit {
  @ViewChild('submitConfirmModal', { static: true })
  submitConfirmModal!: LgsSharedModalComponent;

  questionSet: Questions[] = [];

  questionFrom = this.fb.group({
    coursename: ['a', Validators.required],
    subjectname: ['a', Validators.required],
    question: this.fb.group({
      quetionTitle: ['a', Validators.required],
      option1: ['a', Validators.required],
      option2: ['a', Validators.required],
      option3: ['a', Validators.required],
      option4: ['a', Validators.required],
      correctAnswer: ['a', Validators.required]
    }),
  });

  get f() {
    return this.questionFrom.controls;
  }

  constructor(
    private fb: FormBuilder,
    private apiService: LgsApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  addNewQuestion() {
    this.questionSet.push(Object.assign([], this.f['question'].value));
    this.f['question'].reset();
  }

  resetQuestion() {
    this.f['question'].reset();
  }

  submitQuestionSet() {
    if (this.questionSet.length === 0) {
      this.questionSet.push(Object.assign({}, this.f['question'].value));
    }
    console.log(this.f['question'].value);
    console.log('this.questionSet ==', this.questionSet);
    this.submitConfirmModal.show()
  }

  submitConfrm() {
    const dataToSend: QuestionSet = {
      coursename: this.f['coursename'].value,
      subject: this.f['subjectname'].value,
      questionset: this.questionSet
    };
    console.log('dataToSend ==', dataToSend);
    this.apiService.saveQuestion(dataToSend).subscribe((res) => {
      this.router.navigate(['dashboard'], { relativeTo: this.route.parent });
    });
  }

}
