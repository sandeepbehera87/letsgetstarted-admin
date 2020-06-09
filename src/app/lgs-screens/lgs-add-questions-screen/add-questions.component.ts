import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { Questions, Courses } from './add-question-state/add-question';
import { ApiService } from '../../lgs-core/lgs-mcq-service/api.service';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss'],
})
export class AddQuestionsComponent {
  @ViewChild('questionForm') questionForm;
  @ViewChild('questionMetaForm') questionMetaForm;

  questionMeta: FormGroup;
  question: FormGroup;
  questionSet: Array<Questions> = [];
  minimumQuestionAddedd = false;

  constructor(
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.questionMeta = this.fb.group({
      coursename: '',
      subjectname: '',
      currentdate: '',
      facultyname: ''
    });
    this.question = this.fb.group({
      quetionTitle: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: ''
    });
  }

  onAdd() {
    if (this.questionForm.form.valid) {
      const data: Questions = JSON.parse(JSON.stringify(this.question.value as Questions));
      this.questionSet.push(data);
      this.questionForm.form.reset();
      if (this.questionSet.length > 0) {
        this.minimumQuestionAddedd = true;
      }
    }
  }

  onSubmit() {
    this.spinner.show();
    const data: Courses = JSON.parse(JSON.stringify(this.questionMeta.value as Courses));
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
    this.apiService.saveQuestionToDb(dataToSend).subscribe((res) => {
      this.spinner.hide();
      this.minimumQuestionAddedd = false;
      this.questionMetaForm.form.reset();
    });
  }
}
