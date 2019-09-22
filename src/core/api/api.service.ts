import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    allCourseList = new ReplaySubject<any>();

    constructor(
        private spinner: NgxSpinnerService,
        public db: AngularFireDatabase
    ) { }

    saveQuestionToDb(questionMeta, question) {
        console.log(question);
        this.spinner.show();
        this.db.list('/QuestionDataSet/' +
            questionMeta.courseName + '/' +
            questionMeta.testName).push({ content: question });
        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
    }

    getQueations(): Observable<any> {
        return this.db.list(`QuestionDataSet`)
            .snapshotChanges()
            .pipe(map(items => {
                return items.map(a => {
                    this.spinner.hide();
                    const data: any = a.payload.val();
                    let key = a.payload.key;
                    const dataKeys = [];
                    for (let key in data) {
                        dataKeys.push(key);
                    }
                    return { key, data, dataKeys };
                });
            }));
    }
}