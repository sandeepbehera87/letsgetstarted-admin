import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, tap} from 'rxjs/operators';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  allCourseList = new ReplaySubject<any>();
  getQuestionApi = 'api/questions/getAllQuestions';
  saveQuestionApi = 'api/questions/addQuestion';

  constructor(
    private spinner: NgxSpinnerService,
    public db: AngularFireDatabase,
    private httpClient: HttpClient,
  ) {}

  saveQuestionToDb(dataArry): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient
      .post<any>(this.saveQuestionApi, JSON.stringify(dataArry), httpOptions)
      .pipe(
        map(response => response),
        tap(
          response => response,
          error => error,
        ),
      );
  }

  getQueations(): Observable<any> {
    return this.httpClient.get(this.getQuestionApi).pipe(
      map(response => {
        return response;
      }),
      tap(
        response => response,
        error => error,
      ),
    );
  }
}
