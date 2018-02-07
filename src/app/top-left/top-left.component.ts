import { ModalTourComponent } from './../modal-tour/modal-tour.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TourService } from '../shared/services/tour.service';

@Component({
  selector: 'app-top-left',
  templateUrl: './top-left.component.html',
  styleUrls: ['./top-left.component.scss']
})
export class TopLeftComponent implements OnInit {

  constructor(public dialog: MatDialog, private ts: TourService) { }

  ngOnInit() {
  }

  // openTour(): void {
  //   console.log(this.ts.currentStepInstruction);
  //   let dialogRef = this.dialog.open(ModalTourComponent, {
  //     width: '500px',
  //     data: {
  //       step: this.ts.currentStepInstruction['step'],
  //       title: this.ts.currentStepInstruction['title'],
  //       text: this.ts.currentStepInstruction['text']
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

}
