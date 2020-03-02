import {Component, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastManager} from '../../components/toast/toast.service';
import {Courses} from '../model/courses';
import {Questions} from '../model/question';
import {ApiService} from '../../core/api/api.service';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss'],
})
export class AddQuestionsComponent {
  @ViewChild('questionForm') questionForm;
  @ViewChild('questionMetaForm') questionMetaForm;

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
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    private toastr: ToastManager,
  ) {}

  onAdd() {
    if (this.questionForm.form.valid) {
      const data: Questions = JSON.parse(JSON.stringify(this.question));
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
    this.spinner.show();
    const data: Courses = JSON.parse(JSON.stringify(this.questionMeta));
    const dataToSend = {
      questionData: {
        coursename: data.coursename,
        subjects: {
          subjectname: data.subjectname,
          questionset: this.questionSet,
        },
        facultyname: data.facultyname,
        currentdate: data.currentdate,
      },
    };
    this.apiService.saveQuestionToDb(dataToSend).subscribe(res => {
      this.spinner.hide();
      this.minimumQuestionAddedd = false;
      this.questionMetaForm.form.reset();
      this.toastr.showSuccess('Question set saved successfully');
    });
  }
}