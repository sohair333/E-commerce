import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    SharedModule,
    SwiperModule,
    RadioButtonModule,
    TabViewModule,
    FormsModule,
    InputNumberModule
  ]
})
export class ProductDetailsModule { }
