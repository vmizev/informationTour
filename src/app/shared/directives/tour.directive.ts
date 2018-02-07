import { TourService } from './../services/tour.service';
import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[vfTour]'
})
export class TourDirective implements AfterViewInit {

  @Input() step: string;
  @Input() stepPos: string;

  constructor(private elRef: ElementRef, private ts: TourService) { }
  ngAfterViewInit(): void {
    // console.log(this.elRef);
    // console.log('step - ', this.step);

    let numberStep: number;
    let stepPosition: string;

    stepPosition = this.stepPos;

    numberStep = Number(this.step);

    this.ts.addStep(this.elRef, numberStep, stepPosition);
  }
}
