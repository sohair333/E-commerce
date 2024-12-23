import { SuccessComponent } from './success.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  {
  path: '',
  component: SuccessComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuccessRoutingModule { }
