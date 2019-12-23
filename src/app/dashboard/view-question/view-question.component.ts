import {Component, OnInit, Input, ViewChild, OnChanges} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ModalComponent} from '../../../components/modal/modal.component';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss'],
})
export class ViewQuestionComponent implements OnInit, OnChanges {
  @Input() courses: string[];
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
    this.courseList = this.courses ? Object.keys(this.courses) : [];
    if (this.courseList) this.spinner.hide();
  }

  onCourseClick(course: string) {
    this.showCourseContainer = false;
    this.showTestContainer = true;
    const selectedCourse = this.courses[course];
    this.testNameList = Object.keys(selectedCourse);
    this.testNameList = this.testNameList.map(test => {
      let obj = {};
      let testContents = Object.values(selectedCourse[test]);
      obj['key'] = test;
      obj['value'] = testContents[0];
      return obj;
    });
  }

  onTestClick(test) {
    this.modalComponent.show();
    this.questionData = test;
  }
}
