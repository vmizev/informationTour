import { Steps } from './../steps-model';
import { ModalTourComponent } from './../../modal-tour/modal-tour.component';
import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class TourService {

  open: EventEmitter<boolean> = new EventEmitter();
  showCurrentStep: EventEmitter<Steps> = new EventEmitter();

  private currentStep = 1;
  private currentStepPosition: string;
  private visible: boolean;
  public steps: Steps[] = [
    {
      step: 1,
      title: 'Title #1',
      text: 'Text content of STEP-1.',
      position: '',
      elements: []
    },
    {
      step: 2,
      title: 'Title #2',
      text: 'STEP-2 content.',
      position: '',
      elements: []
    },
    {
      step: 3,
      title: 'Title #3',
      text: '3-STEP custom text.',
      position: '',
      elements: []
    },
    {
      step: 4,
      title: 'Title #4',
      text: 'This is content of STEP-4',
      position: '',
      elements: []
    }
  ];

  constructor() {
    setTimeout(() => { this.showTour(); }, 3000);
  }

  public addStep(element, step: number, stepPosition?: string) {
    const item: Steps = this.steps.find(( i ) => i.step === step);

    // If element got position attribute - save it to step.position
    if (stepPosition) {
      item.position = stepPosition;
    }
    item.elements.push(element);
  }

  showStep(handler) {
    // Save element from steps[] with currentStep value
    const data = this.steps.find((item) => item.step === this.currentStep);

    // If we have 1 or more nodes in elements[] set class 'active' for every element
    if (data.elements.length) {
      // Remove all classes 'active' from steps[]
      this.steps.forEach((item, index, arr) => {
        item.elements.forEach((nodeItem, nodeIndex, nodeArr) => {
          nodeItem.nativeElement.classList.remove('active');
        });
      });
      // Add class 'active' for all nodes in current step
      data.elements.forEach((item, index, arr) => {
        item.nativeElement.classList.add('active');
      });

      // Emit element to component
      this.showCurrentStep.emit(data);
    } else {
      // Remove all classes 'active' from steps[]
      this.steps.forEach((item, index, arr) => {
        item.elements.forEach((nodeItem, nodeIndex, nodeArr) => {
          nodeItem.nativeElement.classList.remove('active');
        });
      });
      // Call handler function
      handler();
    }
  }

  nextStep() {
    if (this.currentStep === this.steps.length) {
      // If currentStep is last - close tour and reset currentStep count
      this.closeTour();
      this.currentStep = 1;
    } else {
      this.currentStep++;
      this.showStep(this.nextStep.bind(this));
    }

  }

  previousStep() {
    // We can call previousStep() only for 2-d and higher step
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showStep(this.previousStep.bind(this));
    }
  }

  closeTour() {
    // Remove all classes 'active' from steps[]
    this.steps.forEach((item, index, arr) => {
      item.elements.forEach((nodeItem, nodeIndex, nodeArr) => {
        nodeItem.nativeElement.classList.remove('active');
      });
    });
    this.visible = false;
    // Emit false value to close tour
    this.open.emit(false);
  }

  showTour() {
    this.visible = true;
    // Emit true value to open tour
    this.open.emit(true);
    this.showStep(this.nextStep.bind(this));
  }

  getStepsCount() {
    // Count all steps that has at least 1 node in document
    const liveSteps = this.steps.filter((item) => item.elements.length);
    return liveSteps.length;
  }

}
