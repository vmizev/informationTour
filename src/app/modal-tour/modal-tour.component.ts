import { Steps } from './../shared/steps-model';
import { Component, OnInit, Inject } from '@angular/core';
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

  showedStep: Steps;
  stepsCount: number;
  currentStep = 1;
  isShowed: boolean;
  stepCoords: any;
  positionStyles: object;
  topPosition: string;
  rightPosition: string;
  bottomPosition: string;
  leftPosition: string;
  debounceTimer;

  baseWidth: number;
  // currentWidth: number;
  currentWidth: BehaviorSubject<number> = new BehaviorSubject<number>(document.body.clientWidth);

  constructor(private ts: TourService) {}

  ngOnInit() {
    this.ts.showCurrentStep.subscribe(
      value => {
        this.showedStep = value;
        // this.stepCoords = {
        //   offsetHeight: this.showedStep.elements[0].nativeElement.offsetHeight,
        //   offsetLeft: this.showedStep.elements[0].nativeElement.offsetLeft,
        //   offsetTop: this.showedStep.elements[0].nativeElement.offsetTop,
        //   offsetWidth: this.showedStep.elements[0].nativeElement.offsetWidth,
        //   clientHeight: this.showedStep.elements[0].nativeElement.clientHeight,
        //   clientLeft: this.showedStep.elements[0].nativeElement.clientLeft,
        //   clientTop: this.showedStep.elements[0].nativeElement.clientTop,
        //   clientWidth: this.showedStep.elements[0].nativeElement.clientWidth
        // };

        this.setModalPosition();

        this.baseWidth = document.body.clientWidth;
        console.log('current1 ', this.currentWidth);


        console.log('width', document.body.clientWidth);
        console.log('stepCoords', this.stepCoords);
        // this.getPosition()
        // console.log('offsetHeight', this.showedStep.elements[0].nativeElement.offsetHeight);
        // console.log('offsetLeft', this.showedStep.elements[0].nativeElement.offsetLeft);
        // console.log('offsetTop', this.showedStep.elements[0].nativeElement.offsetTop);
        // console.log('offsetWidth', this.showedStep.elements[0].nativeElement.offsetWidth);
      }
    );

    this.ts.open.subscribe(
      value => {
        this.isShowed = value;
        // console.log('isShowed', this.isShowed);
      }
    );
  }
  ngAfterViewInit() {
    this.stepsCount = this.ts.getStepsCount();
    // setTimeout( () => this.setModalPosition(this.showedStep.position), 0 );
    // this.setModalPosition(this.showedStep.position);
  }

  onResize(event) {

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout( () => this.setModalPosition(), 500 );



    // this.currentWidth.next(event.target.innerWidth);
    //  console.log('X', this.showedStep.elements[0].nativeElement.offsetLeft);
    // this.setModalPosition();
    // setTimeout( () => this.setModalPosition(), 3000 )
  }

  goBack() {
    this.ts.previousStep();
    this.currentStep--;
    // console.log('Go back!');
  }
  goNext() {
    this.ts.nextStep();
    this.currentStep++;
    // console.log('Go next!');
  }
  close() {
    this.ts.closeTour();
    // console.log('Close!');
  }

  setModalPosition() {
    const pos = this.showedStep.position;
    const el = this.showedStep.elements[0].nativeElement;
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
          // left: el['offsetLeft'] - el['offsetLeft'] + 10 + 'px'
          left: el.offsetLeft - (el.offsetLeft / 4) + 10 + 'px'
        };
        console.log(this.positionStyles);
      } break;
      case 'left': {
        console.log('MODAL left');
        this.positionStyles = {
          top : el.offsetTop  + 'px',
          left: el.offsetLeft - 400 - 10 + 'px',
          // right: '',
          // bottom: ''
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
