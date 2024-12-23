import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    OffersComponent
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    SharedModule,
    SwiperModule
  ]
})
export class OffersModule { }
