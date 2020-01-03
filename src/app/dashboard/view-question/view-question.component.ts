import {Component, OnInit, Input, ViewChild, OnChanges} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ModalComponent} from '../../../components/modal/modal.component';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss'],
})
export class ViewQuestionComponent implements OnInit, OnChanges {
  @Input() courses: any[];
  @ViewChild(ModalComponent, {static: false}) modalComponent: ModalComponent;

  testNameList = [];
  testList = [];
  questionData = [];
  showCourseContainer = false;
  showTestContainer = false;
  courseList = [];

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    this.showCourseContainer = true;
  }

  showCourseList() {
    this.showCourseContainer = true;
    this.showTestContainer = false;
  }

  ngOnChanges() {
    if (this.courses) {
      this.courses = this.courses.map(item => {
        return item.questionData;
      });
      this.courseList = this.courses.map(item => {
        return item.coursename;
      });
      if (this.courseList) this.spinner.hide();
    }
  }

  onCourseClick(course: string) {
    this.showCourseContainer = false;
    this.showTestContainer = true;
    const selectedCourse = this.courses.filter(
      item => item.coursename === course,
    );
    this.testNameList.push(selectedCourse[0].subjects.subjectname);
    this.testNameList = this.testNameList.map(test => {
      let obj = {};
      let testContents = selectedCourse[0].subjects.questionset;
      obj['key'] = test;
      obj['value'] = testContents;
      return obj;
    });
  }

  onTestClick(test) {
    this.modalComponent.show();
    this.questionData = test;
  }
}
