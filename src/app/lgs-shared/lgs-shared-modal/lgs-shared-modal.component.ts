import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  standalone: false,
  selector: 'lgs-shared-modal',
  templateUrl: './lgs-shared-modal.component.html',
  styleUrls: ['./lgs-shared-modal.component.css']
})
export class LgsSharedModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() closeBtnName: string = '';
  @Input() confirmBtnName: string = '';

  @Output() onConfirm = new EventEmitter();

  visible = false;

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  onConfirmClick(evt: any) {
    this.onConfirm.emit(evt);
    this.hide();
  }

  onHideDialog() {
    this.visible = false;
  }
}
