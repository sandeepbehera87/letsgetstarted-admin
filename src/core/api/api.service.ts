import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, tap} from 'rxjs/operators';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  allCourseList = new ReplaySubject<any>();
  getQuestionApi = 'questions/lists';

  constructor(
    private spinner: NgxSpinnerService,
    public db: AngularFireDatabase,
    private httpClient: HttpClient,
  ) {}

  saveQuestionToDb(questionMeta, question) {
    this.spinner.show();
    this.db
      .list(
        '/QuestionDataSet/' +
          questionMeta.courseName +
          '/' +
          questionMeta.testName,
      )
      .push({content: question});
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  getQueations(): Observable<any> {
    return this.httpClient.get(this.getQuestionApi).pipe(
      map(response => response['QuestionDataSet']),
      tap(response => response, error => error),
    );
  }
}
