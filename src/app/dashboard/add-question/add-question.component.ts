import {Component, ViewChild} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from '../../../core/api/api.service';
import {ToastManager} from '../../../core/toast/toast.service';
import {Courses} from '../../model/courses';
import {Questions} from '../../model/question';

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
    currentdate: '',
    facultyname: '',
  };
  question: Questions = {
    quetionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
  };
  questionSet: Array<Questions> = [];
  minimumQuestionAddedd = false;

  constructor(
    public db: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    private toastr: ToastManager,
  ) {}

  onAdd() {
    if (this.questionForm.form.valid) {
      var data: Questions = JSON.parse(JSON.stringify(this.question));
      this.questionSet.push(data);
      this.questionForm.form.reset();
      this.toastr.showSuccess(
        this.questionSet.length + ' Question/s addedd successfully',
      );
      if (this.questionSet.length > 0) {
        this.minimumQuestionAddedd = true;
      }
    }
  }
  onSubmit() {
    this.apiService.saveQuestionToDb(
      this.questionMetaForm.value.questionMeta,
      this.questionSet,
    );
    setTimeout(() => {
      this.questionMetaForm.form.reset();
      this.toastr.showSuccess('Question set saved successfully');
    }, 1000);
  }
}
