import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, first, Observable } from 'rxjs';
import { QuestionSet } from '../../lgs-interface';
import { LgsApiService } from '../../lgs-api/lgs-api.service';

@Injectable({
  providedIn: 'root',
})
export class LgsViewQuestionResolverService {
  constructor(
    private apiService: LgsApiService,
    private router: Router,
  ) {}

  resolve(): Observable<QuestionSet[]> {
    return this.apiService.getQueations().pipe(
      first(),
      catchError(() => {
        this.router.navigate(['/shell/dashboard/error']);
        return EMPTY;
      }),
    );
  }
}