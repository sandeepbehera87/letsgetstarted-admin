import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';
import { QuestionSet } from '../../lgs-interface';
import { LgsApiService } from '../../lgs-api/lgs-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LgsViewQuestionResolverService {

  constructor(
    private apiService: LgsApiService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  resolve(): Observable<QuestionSet[]> {
    return this.apiService.getQueations().pipe(
      first(),
      tap(
        res => res,
        err => this.router.navigate(['shell/dashboard/error'], { relativeTo: this.route })
        ),
      );
  }
}
