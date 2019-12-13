import {Component, ViewChild} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from '../../../core/api/api.service';
import {ToastManager} from '../../../core/toast/toast.service';
import {Courses} from '../model/courses';
import {Questions} from '../model/question';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent {
  @ViewChild('questionForm', {static: false}) questionForm;
  @ViewChild('questionMetaForm', {static: false}) questionMetaForm;

  questionMeta: Courses = {
    coursename: '',
    subjectname: '',
    date: '',
    author: '',
  };
  question: Questions;
  questionSet: Array<Questions> = [];
  minimumQuestionAddedd = false;

  constructor(
    public db: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    private toastr: ToastManager,
  ) {}

  onAdd(questionForm: HTMLFormElement) {
    if (questionForm.form.valid) {
      this.questionSet.push(questionForm.value.question);
      questionForm.form.reset();
      this.toastr.showSuccess(
        this.questionSet.length + ' Question/s addedd successfully',
      );
      if (this.questionSet.length > 0) {
        this.minimumQuestionAddedd = true;
      }
    }
  }
  onSubmit(questionMetaForm: HTMLFormElement) {
    this.apiService.saveQuestionToDb(
      questionMetaForm.value.questionMeta,
      this.questionSet,
    );
    setTimeout(() => {
      questionMetaForm.form.reset();
      this.toastr.showSuccess('Question set saved successfully');
    }, 1000);
  }
}
