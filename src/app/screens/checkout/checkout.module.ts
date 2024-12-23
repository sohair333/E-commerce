import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { AdressComponent } from './components/adress/adress.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutWebComponent } from './checkout-web/checkout-web.component';
import { RouterModule } from '@angular/router';
import { SuccessMsgComponent } from './components/success-msg/success-msg.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    AdressComponent,
    CheckoutWebComponent,
    SuccessMsgComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CheckoutModule { }
