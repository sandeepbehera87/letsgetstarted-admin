import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LgsApiService } from 'src/app/lgs-api/lgs-api.service';

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
  standalone: false,
  selector: 'lgs-add-questions',
  templateUrl: './lgs-add-questions.component.html',
  styleUrls: ['./lgs-add-questions.component.css']
})
export class LgsAddQuestionsComponent implements OnInit {
  questionSet: Questions[] = [];

  questionFrom: FormGroup;

  get f() {
    return this.questionFrom.controls;
  }

  constructor(
    private fb: FormBuilder,
    private apiService: LgsApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.questionFrom = this.fb.group({
      coursename: ['', Validators.required],
      subjectname: ['', Validators.required],
      question: this.fb.group({
        quetionTitle: ['', Validators.required],
        option1: ['', Validators.required],
        option2: ['', Validators.required],
        option3: ['', Validators.required],
        option4: ['', Validators.required],
        correctAnswer: ['', Validators.required]
      }),
    });
  }

  ngOnInit(): void {
  }

  addNewQuestion() {
    this.questionSet.push(Object.assign([], this.f['question'].value) as Questions);
    this.f['question'].reset();
  }

  resetQuestion() {
    this.f['question'].reset();
  }

  submitQuestionSet() {
    if (this.questionSet.length === 0) {
      this.questionSet.push(Object.assign({}, this.f['question'].value) as Questions);
    }
    console.log(this.f['question'].value);
    console.log('this.questionSet ==', this.questionSet);
    if (confirm('Submit this question set?')) {
      this.submitConfrm();
    }
  }

  submitConfrm() {
    const dataToSend: QuestionSet = {
      coursename: this.f['coursename'].value as string,
      subject: this.f['subjectname'].value as string,
      questionset: this.questionSet
    };
    console.log('dataToSend ==', dataToSend);
    this.apiService.saveQuestion(dataToSend).subscribe((res) => {
      this.router.navigate(['dashboard'], { relativeTo: this.route.parent });
    });
  }

}
