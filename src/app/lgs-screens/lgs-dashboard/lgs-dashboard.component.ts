import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { LgsApiService } from '../../lgs-api/lgs-api.service';
import { Questions, QuestionSet } from '../../lgs-interface';
import { LgsErrorService } from '../../lgs-shared/lgs-error-service/lgs-error.service';
import { LgsToastService } from '../../lgs-shared/lgs-toast/lgs-toast.service';

@Component({
  standalone: false,
  selector: 'lgs-dashboard',
  templateUrl: './lgs-dashboard.component.html',
  styleUrls: ['./lgs-dashboard.component.css']
})
export class LgsDashboardComponent implements OnInit {
  questions: QuestionSet[] = [];
  questionset: Questions[] | null = null;
  showSet = false;
  showDeleteModal = false;
  pendingDelete: QuestionSet | null = null;
  deletingId: string | null = null;
  isRefreshing = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: LgsApiService,
    private toastService: LgsToastService,
    private errorService: LgsErrorService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.questions = res['questions'] ?? [];
    });
  }

  viewQuestionSet(_questionset: Questions[]): void {
    this.questionset = _questionset;
    this.showSet = true;
  }

  closeSet(): void {
    this.showSet = false;
    this.questionset = null;
  }

  deleteQuestion(question: QuestionSet): void {
    if (!question._id) {
      this.toastService.showError('This question set cannot be deleted (missing id).');
      return;
    }

    this.pendingDelete = question;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    if (this.deletingId) {
      return;
    }
    this.showDeleteModal = false;
    this.pendingDelete = null;
  }

  confirmDelete(): void {
    const question = this.pendingDelete;
    if (!question?._id || this.deletingId) {
      return;
    }

    const deletedId = question._id;
    this.deletingId = deletedId;
    this.cdr.detectChanges();

    this.apiService.deleteQuestion(deletedId).pipe(
      tap(() => this.closeDeleteModal()),
      switchMap(() =>
        this.apiService.getQueations().pipe(
          catchError(() => of(this.questions.filter((q) => q._id !== deletedId))),
        ),
      ),
      finalize(() => {
        this.deletingId = null;
        this.cdr.detectChanges();
      }),
    ).subscribe({
      next: (questions) => {
        this.questions = questions ?? [];
        this.toastService.showSuccess('Question set deleted.');
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.refreshQuestions();
        this.toastService.showError(
          this.errorService.getDisplayMessage(error, {
            fallback: 'Failed to delete question set. Please try again.',
          }),
        );
        this.cdr.detectChanges();
      },
    });
  }

  private closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.pendingDelete = null;
    this.cdr.detectChanges();
  }

  refreshQuestions(): void {
    if (this.isRefreshing) {
      return;
    }

    this.isRefreshing = true;
    this.cdr.detectChanges();

    this.apiService.getQueations().subscribe({
      next: (questions) => {
        this.questions = questions ?? [];
        this.isRefreshing = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isRefreshing = false;
        this.toastService.showError(
          this.errorService.getDisplayMessage(error, {
            fallback: 'Failed to refresh questions. Please try again.',
          }),
        );
        this.cdr.detectChanges();
      },
    });
  }

  get pendingDeleteLabel(): string {
    if (!this.pendingDelete) {
      return '';
    }
    return `${this.pendingDelete.coursename} / ${this.pendingDelete.subject}`;
  }

  get pendingDeleteCount(): number {
    return this.pendingDelete?.questionset?.length ?? 0;
  }

  isDeleting(question: QuestionSet): boolean {
    return !!question._id && this.deletingId === question._id;
  }
}