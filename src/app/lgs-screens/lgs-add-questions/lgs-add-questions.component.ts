import { Component, OnInit } from '@angular/core';
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
export class LgsAddQuestionsComponent implements OnInit {
  questionSet: Questions[] = [];
  questionFrom: FormGroup;
  isEditMode = false;
  editingId: string | null = null;
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

  ngOnInit(): void {
    const state = history.state as { question?: QuestionSet };
    const question = state?.question;

    if (!question?._id) {
      return;
    }

    this.isEditMode = true;
    this.editingId = question._id;
    this.questionSet = [...(question.questionset ?? [])];
    this.questionFrom.patchValue({
      coursename: question.coursename,
      subjectname: question.subject,
    });
    this.questionFrom.markAsDirty();
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

    const actionLabel = this.isEditMode ? 'Update' : 'Submit';
    if (confirm(`${actionLabel} this question set?`)) {
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
    const request$ = this.isEditMode && this.editingId
      ? this.apiService.updateQuestion(this.editingId, dataToSend)
      : this.apiService.saveQuestion(dataToSend);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toastService.showSuccess(
          this.isEditMode ? 'Question set updated.' : 'Question set saved.',
        );
        this.router.navigate(['/shell/dashboard']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.toastService.showError(
          this.errorService.getDisplayMessage(error, {
            fallback: this.isEditMode
              ? 'Failed to update question set. Please try again.'
              : 'Failed to save question set. Please try again.',
          }),
        );
      },
    });
  }
}