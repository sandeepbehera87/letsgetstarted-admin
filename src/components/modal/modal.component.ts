import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ModalComponent implements OnInit {
  @Input() title;
  @ViewChild('content', {static: false}) content: ElementRef;

  config: NgbModalConfig = {
    backdrop: 'static',
    keyboard: false
  };

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  show() {
    this.modalService.open(this.content);
  }

  hide() {
    this.modalService.dismissAll();
  }

}
