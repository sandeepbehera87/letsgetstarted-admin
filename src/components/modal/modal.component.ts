import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  @Input() titleDialog;
  @ViewChild('template', {static: false}) template: ElementRef;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  show() {
    this.modalRef = this.modalService.show(this.template);
  }
}
