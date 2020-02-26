import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap, map} from 'rxjs/operators';
import * as Crypto from 'crypto-js';
import {Observable, BehaviorSubject} from 'rxjs';
import {ErrorHandlerService} from '../http-error-handling/error-handler.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  allCourseList = new BehaviorSubject(0);
  saveQuestion = new BehaviorSubject(0);
  getQuestionApi = 'api/questions/getAllQuestions';
  saveQuestionApi = 'api/questions/addQuestion';

  constructor(
    private errorHandler: ErrorHandlerService,
    private httpClient: HttpClient,
  ) {}

  saveQuestionToDb(dataArry): Observable<any> {
    const data = Crypto.AES.encrypt(
      JSON.stringify(dataArry),
      environment.secret_key,
    ).toString();
    return this.httpClient
      .post<any>(this.saveQuestionApi, JSON.stringify({data}))
      .pipe(
        tap(
          response => this.saveQuestion.next(response),
          error => error,
        ),
      );
  }

  getQueations(): Observable<any> {
    return this.httpClient.get(this.getQuestionApi).pipe(
      map(response => {
        const bytes = Crypto.AES.decrypt(response, environment.secret_key);
        const decryptedData = JSON.parse(bytes.toString(Crypto.enc.Utf8));
        return decryptedData;
      }),
      tap(
        response => this.allCourseList.next(response),
        error => this.errorHandler.handleError(error),
      ),
    );
  }
}
