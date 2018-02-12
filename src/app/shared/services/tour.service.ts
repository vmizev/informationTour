import { Steps } from './../steps-model';
import { ModalTourComponent } from './../../modal-tour/modal-tour.component';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TourService {

  open: EventEmitter<boolean> = new EventEmitter();
  showCurrentStep: EventEmitter<Steps> = new EventEmitter();

  private currentStep = 1;
  private currentStepPosition: string;
  private visible: boolean;
  public steps: Steps[];

  constructor(private http: HttpClient) {
    this.initData();
    setTimeout(() => { this.showTour(); }, 3000);
  }

  getData() {
    const dataUrl = './assets/step-list1.json';
    return this.http.get<Steps[]>(dataUrl);
  }

  initData() {
    this.getData().subscribe(data => this.steps = data, err => console.log(err));
  }

  public addStep(element, step: number, stepPosition?: string) {
    const item: Steps = this.steps.find(( i ) => i.step === step);

    // If element got position attribute - save it to step.position
    if (stepPosition) {
      item.position = stepPosition;
    }
    item.elements.push(element);
  }

  goToStep(n) {
    this.currentStep = n;
    this.showStep(this.nextStep);
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
    this.currentStep = 1;
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
