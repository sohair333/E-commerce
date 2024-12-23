import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    SwiperModule
  ]
})
export class CategoriesModule { }
