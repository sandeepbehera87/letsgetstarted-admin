import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, tap} from 'rxjs/operators';
import {Observable, ReplaySubject} from 'rxjs';
import {SharedService} from '../shared/shared.service';
import {ErrorHandlerService} from '../http-error-handling/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  allCourseList = new ReplaySubject<any>();
  getQuestionApi = 'api/questions/getAllQuestions';
  saveQuestionApi = 'api/questions/addQuestion';

  constructor(
    private errorHandler: ErrorHandlerService,
    public db: AngularFireDatabase,
    private httpClient: HttpClient,
    private sharedService: SharedService,
  ) {}

  saveQuestionToDb(dataArry): Observable<any> {
    return this.httpClient
      .post<any>(this.saveQuestionApi, JSON.stringify(dataArry))
      .pipe(
        map(response => response),
        tap(
          response => response,
          error => error,
        ),
      );
  }

  getQueations(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'api-token': this.sharedService.apiToken,
      }),
    };
    return this.httpClient.get(this.getQuestionApi, httpOptions).pipe(
      map(response => {
        return response;
      }),
      tap(
        response => response,
        error => {
          this.errorHandler.handleError(error);
        },
      ),
    );
  }
}
