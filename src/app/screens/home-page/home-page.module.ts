import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { BannersComponent } from './components/banners/banners.component';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { ShopByCategoryComponent } from './components/shop-by-category/shop-by-category.component';
import { NewArrivalComponent } from './components/new-arrival/new-arrival.component';
import { ShopByBrandComponent } from './components/shop-by-brand/shop-by-brand.component';
import { FlashOfferComponent } from './components/flash-offer/flash-offer.component';


@NgModule({
  declarations: [
    HomePageComponent,
    BannersComponent,
    SubCategoriesComponent,
    ShopByCategoryComponent,
    NewArrivalComponent,
    ShopByBrandComponent,
    FlashOfferComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
    SwiperModule
  ]
})
export class HomePageModule { }
