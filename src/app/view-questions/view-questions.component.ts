import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  ViewChild,
} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ModalComponent} from '../../components/modal/modal.component';
import {ApiService} from '../../core/api/api.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss'],
})
export class ViewQuestionsComponent implements OnInit, OnChanges {
  @ViewChild(ModalComponent) modalComponent: ModalComponent;
  courseList$ = this.apiService.getQueations();

  testNameList = [];
  testList = [];
  questionData = [];
  showCourseContainer = false;
  showTestContainer = false;
  courses = [];
  courseList = [];

  constructor(
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.showCourseContainer = true;
    this.apiService.getQueations().subscribe(courses => {
      this.courses = courses.map(item => {
        return item.questionData;
      });
      this.courseList = Array.from(
        new Set(
          this.courses.map(item => {
            return item.coursename;
          }),
        ),
      );
      if (this.courseList) {
        this.spinner.hide();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes.courses !== 'undefined') {
      this.courses = this.courses.map(item => {
        return item.questionData;
      });
      this.courseList = Array.from(
        new Set(
          this.courses.map(item => {
            return item.coursename;
          }),
        ),
      );
      if (this.courseList) {
        this.spinner.hide();
      }
    }
  }

  showCourseList = () => {
    this.showCourseContainer = true;
    this.showTestContainer = false;
  }

  onCourseClick = (course: string) => {
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

  onTestClick = test => {
    this.modalComponent.show();
    this.questionData = test;
  }
}
