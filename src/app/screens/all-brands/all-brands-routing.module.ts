import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBrandsComponent } from './all-brands.component';

const routes: Routes = [
  {
    path: '',
    component: AllBrandsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllBrandsRoutingModule { }
