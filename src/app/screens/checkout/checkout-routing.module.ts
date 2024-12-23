import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { AdressComponent } from './components/adress/adress.component';
import { SuccessMsgComponent } from './components/success-msg/success-msg.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
  },
  {
    path: 'address',
    component: AdressComponent,
  },
  {
    path: 'success',
    component:SuccessMsgComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
