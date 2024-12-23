import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListMobileComponent } from './product-list-mobile/product-list-mobile.component';
import { RouterModule } from '@angular/router';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ProductListComponent,
    ProductListMobileComponent,
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    InputNumberModule,
    FormsModule,
    RadioButtonModule,
    SharedModule,
    RouterModule,
    NgxSliderModule
  ]
})

export class ProductListModule { }
