import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LgsApiService } from 'src/app/lgs-api/lgs-api.service';
import { Questions, QuestionSet } from '../../lgs-interface';
import { LgsErrorService } from '../../lgs-shared/lgs-error-service/lgs-error.service';
import { LgsToastService } from '../../lgs-shared/lgs-toast/lgs-toast.service';

@Component({
  standalone: false,
  selector: 'lgs-add-questions',
  templateUrl: './lgs-add-questions.component.html',
  styleUrls: ['./lgs-add-questions.component.css']
})
export class LgsAddQuestionsComponent {
  questionSet: Questions[] = [];
  questionFrom: FormGroup;
  isSubmitting = false;

  get f() {
    return this.questionFrom.controls;
  }

  constructor(
    private fb: FormBuilder,
    private apiService: LgsApiService,
    private router: Router,
    private toastService: LgsToastService,
    private errorService: LgsErrorService,
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

  addNewQuestion() {
    this.questionSet.push({ ...this.f['question'].value } as Questions);
    this.f['question'].reset();
  }

  resetQuestion() {
    this.f['question'].reset();
  }

  submitQuestionSet() {
    if (this.questionSet.length === 0) {
      this.questionSet.push({ ...this.f['question'].value } as Questions);
    }

    if (confirm('Submit this question set?')) {
      this.submitConfirm();
    }
  }

  submitConfirm() {
    const dataToSend: QuestionSet = {
      coursename: this.f['coursename'].value as string,
      subject: this.f['subjectname'].value as string,
      questionset: this.questionSet,
    };

    this.isSubmitting = true;
    this.apiService.saveQuestion(dataToSend).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toastService.showSuccess('Question set saved.');
        this.router.navigate(['/shell/dashboard']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.toastService.showError(
          this.errorService.getDisplayMessage(error, {
            fallback: 'Failed to save question set. Please try again.',
          }),
        );
      },
    });
  }
}