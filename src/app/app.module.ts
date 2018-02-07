import { TourService } from './shared/services/tour.service';
import { ResizeService } from './shared/services/resize.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TopLeftComponent } from './top-left/top-left.component';
import { TopRightComponent } from './top-right/top-right.component';
import { BotomRightComponent } from './botom-right/botom-right.component';
import { BottomLeftComponent } from './bottom-left/bottom-left.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TourDirective } from './shared/directives/tour.directive';
import { ModalTourComponent } from './modal-tour/modal-tour.component';


@NgModule({
  declarations: [
    AppComponent,
    TopLeftComponent,
    TopRightComponent,
    BotomRightComponent,
    BottomLeftComponent,
    TourDirective,
    ModalTourComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    ModalTourComponent
  ],
  providers: [TourService, ResizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
