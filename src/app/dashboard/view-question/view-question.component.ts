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
  @ViewChild(ModalComponent) modalComponent: ModalComponent;

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
      this.courseList = Array.from(new Set(this.courses.map(item => {
        return item.coursename;
      })));
      if (this.courseList) {
        this.spinner.hide();
      }
    }
  }

  onCourseClick(course: string) {
    this.testNameList = [];
    this.showCourseContainer = false;
    this.showTestContainer = true;
    const selectedCourse = this.courses.filter(
      item => item.coursename === course,
    );
    this.testNameList = selectedCourse.map(item => {
     return item.subjects;
    });
  }

  onTestClick(test) {
    this.modalComponent.show();
    this.questionData = test;
  }
}
