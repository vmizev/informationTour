import { Steps } from './../shared/steps-model';
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { TourService } from '../shared/services/tour.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { ResizeService } from '../shared/services/resize.service';

@Component({
  selector: 'app-modal-tour',
  templateUrl: './modal-tour.component.html',
  styleUrls: ['./modal-tour.component.scss']
})
export class ModalTourComponent implements OnInit, AfterViewInit {

  @ViewChild('myWindow', {read: ElementRef}) myWindow: ElementRef;

  showedStep: Steps;
  stepsCount: number;
  isShowed: boolean;
  positionStyles: object;
  debounceTimer;

  constructor(private ts: TourService, private elem: ElementRef) {}

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
    console.log(this.myWindow);
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

    // Set coordinates for modal
    switch (pos) {
      case 'top': {
        console.log('MODAL top');
        this.positionStyles = {
          top : el.offsetTop - 140 - 10 + 'px',
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
          left: el.offsetLeft - 400 - 10 + 'px'
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
