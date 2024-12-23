import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCardRoutingModule } from './view-card-routing.module';
import { ViewCardComponent } from './view-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewCardComponent
  ],
  imports: [
    CommonModule,
    ViewCardRoutingModule,
    SharedModule,
    FormsModule
  ]
})


export class ViewCardModule { }
