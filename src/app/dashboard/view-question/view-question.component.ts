import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ApiService } from '../../../core/api/api.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {

  @Input() courses: string[];
  @ViewChild(ModalComponent, {static: false}) modalComponent: ModalComponent;

  testNameList = [];
  testList = [];
  questionData = [];
  showCourseContainer = false;
  showTestContainer = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.showCourseContainer = true;
  }

  showCourseList() {
    this.showCourseContainer = true;
    this.showTestContainer = false;
  }

  onCourseClick(course: string) {
    this.testNameList = [];
    this.apiService.getQueations().subscribe((dataset) => {
      this.showCourseContainer = false;
      this.showTestContainer = true;
      for (let resp of dataset) {
        if (resp.key === course.toString()) {
          this.testList.push(resp.data);
          for (let key in resp.data) {
            this.testNameList.push(key);
          }
        }
      }
    });
  }

  onTestClick(test) {
    this.modalComponent.show();
    this.questionData = this.getValue(this.testList, test);
  }

  getValue(datalist, test) {
    for (let key1 in datalist) {
      const val1 = datalist[key1];
      for (let key2 in val1) {
        if (key2 === test.toString()) {
          const val2 = val1[key2];
          for (let key3 in val2) {
            const val3 = val2[key3];
            for (let key4 in val3) {
              const val4 = val3[key4];
              return val4;
            }
          }
        }
      }
    }
  }

}
