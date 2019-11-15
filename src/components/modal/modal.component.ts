import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ModalComponent implements OnInit {
  @Input() titleDialog;
  @ViewChild('content', {static: false}) content: ElementRef;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  show() {
    this.modalService.open(this.content);
  }

  hide() {
    this.modalService.dismissAll();
  }
}
