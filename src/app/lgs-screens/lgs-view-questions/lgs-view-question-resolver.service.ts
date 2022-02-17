import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { QuestionSet } from '../../lgs-interface';
import { LgsApiService } from '../../lgs-api/lgs-api.service';

@Injectable({
  providedIn: 'root'
})
export class LgsViewQuestionResolverService {

  constructor(private apiService: LgsApiService) { }

  resolve(): Observable<QuestionSet[]> {
    return this.apiService.getQueations().pipe(first());
  }
}
