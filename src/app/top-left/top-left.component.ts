import { ModalTourComponent } from './../modal-tour/modal-tour.component';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  go() {
    this.ts.showTour();
  }

}
