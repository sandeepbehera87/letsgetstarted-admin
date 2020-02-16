import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ModalModule} from 'ngx-bootstrap';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {ModalComponent} from './modal.component';
import {ElementRef, Injectable} from '@angular/core';

@Injectable()
export class MockElementRef extends ElementRef {
  static template: any;
}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  const mockModalService = {
    show: jasmine.createSpy('show'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      declarations: [ModalComponent],
      providers: [
        {provide: BsModalService, useValue: mockModalService},
        {provide: ElementRef, useClass: MockElementRef},
        BsModalRef,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    MockElementRef.template = fixture.debugElement.nativeElement.querySelector(
      '#template',
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the show function of BsModalService', () => {
    component.show();
    expect(mockModalService.show).toHaveBeenCalled();
  });
});
