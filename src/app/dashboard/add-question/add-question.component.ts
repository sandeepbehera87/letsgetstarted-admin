import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from "../../../core/api/api.service";
import { ToastManager } from "../../../core/toast/toast.service";

@Component({
  selector: "app-add-question",
  templateUrl: "./add-question.component.html",
  styleUrls: ["./add-question.component.scss"]
})
export class AddQuestionComponent implements OnInit {
  @ViewChild("questionForm", { static: false }) questionForm;
  @ViewChild("questionMetaForm", { static: false }) questionMetaForm;

  bsValue = new Date();
  questionMeta = {
    testName: "",
    courseName: "",
    date: "",
    facultyName: ""
  };
  question = {};
  questionSet = [];
  minimumQuestionAddedd = false;

  constructor(
    public db: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    private toastr: ToastManager
  ) {}

  ngOnInit() {}

  onAdd() {
    let ques = Object.assign({}, this.question);
    this.question = {};
    this.questionSet.push(ques);
    this.toastr.showSuccess(
      this.questionSet.length + " Question/s addedd successfully"
    );
    if (this.questionSet.length > 0) {
      this.minimumQuestionAddedd = true;
    }
  }
  onSubmit() {
    this.apiService.saveQuestionToDb(this.questionMeta, this.questionSet);
    setTimeout(() => {
      this.toastr.showSuccess("Question set saved successfully");
    }, 1000);
  }
}
