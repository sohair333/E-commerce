import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishListComponent } from './wish-list.component';

const routes: Routes = [
  {
    path: '',
    component: WishListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishListRoutingModule { }
