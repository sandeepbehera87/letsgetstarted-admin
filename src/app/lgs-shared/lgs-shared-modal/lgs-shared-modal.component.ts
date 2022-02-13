import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'lgs-shared-modal',
  templateUrl: './lgs-shared-modal.component.html',
  styleUrls: ['./lgs-shared-modal.component.css']
})
export class LgsSharedModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() closeBtnName: string = 'Close';
  @Input() confirmBtnName: string = 'Ok';

  @Output() onConfirm = new EventEmitter();
  
  @ViewChild(ModalDirective, {static: true})
  modal!: ModalDirective;

  config: ModalOptions = {
    backdrop: 'static',
    show: false,
    keyboard: false
  }

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.modal.show()
  }

  hide() {
    this.modal.hide();
  }

  onConfirmClick(evt: any) {
    this.onConfirm.emit(evt);
  }
}
