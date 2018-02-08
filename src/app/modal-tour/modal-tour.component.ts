import { Steps } from './../shared/steps-model';
import { Component, OnInit, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { TourService } from '../shared/services/tour.service';

@Component({
  selector: 'app-modal-tour',
  templateUrl: './modal-tour.component.html',
  styleUrls: ['./modal-tour.component.scss']
})
export class ModalTourComponent implements OnInit, AfterViewInit {

  @ViewChild('modalWindow', {read: ElementRef}) modalWindow: ElementRef;

  showedStep: Steps;
  stepsCount: number;
  isShowed = false;
  positionStyles: object;
  debounceTimer;

  constructor(private ts: TourService) {}

  ngOnInit() {
    // Get step element
    this.ts.showCurrentStep.subscribe( (stepItem: Steps) => {
        this.showedStep = stepItem;
        this.setModalPosition();
      }
    );
    // Show or hide overlay
    this.ts.open.subscribe(
      value => {
        this.isShowed = value;
      }
    );
  }

  ngAfterViewInit() {
    this.stepsCount = this.ts.getStepsCount();
  }

  onResize(event) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout( () => this.setModalPosition(), 500 );
  }

  goBack() {
    this.ts.previousStep();
  }

  goNext() {
    this.ts.nextStep();
  }

  close() {
    this.ts.closeTour();
  }

  setModalPosition() {
    const pos = this.showedStep.position;

    // Get first element from elements[]
    const el = this.showedStep.elements[0].nativeElement;

    // Get modal width and height for offsets
    const modalHeight = this.modalWindow.nativeElement.clientHeight;
    const modalWidth = this.modalWindow.nativeElement.clientWidth;

    if (modalHeight === 0) {
      setTimeout( () => this.setModalPosition(), 0);
      return;
    }

    // Set coordinates for modal
    switch (pos) {
      case 'top': {
        console.log('MODAL top');
        this.positionStyles = {
          top : el.offsetTop - modalHeight - 10 + 'px',
          left: el.offsetLeft  + 'px'
        };
      } break;
      case 'right': {
        console.log('MODAL right');
        this.positionStyles = {
          top : el.offsetHeight / 4 + 'px',
          left: el.offsetLeft + el.offsetWidth  + 10 + 'px'
        };
      } break;
      case 'bottom': {
        console.log('MODAL bottom');
        this.positionStyles = {
          top : el.offsetTop + el.clientHeight + 10 + 'px',
          left: el.offsetLeft - (el.offsetLeft / 4) + 10 + 'px'
        };
      } break;
      case 'left': {
        console.log('MODAL left');
        this.positionStyles = {
          top : el.offsetTop  + 'px',
          left: el.offsetLeft - modalWidth - 10 + 'px'
        };
      } break;
      default: {
        console.log('NO POSITION');
        this.positionStyles = {
          top : el.offsetHeight / 4 + 'px',
          left: el.offsetLeft + el.offsetWidth + 10 + 'px',
        };
      }
    }
  }
}
