import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsScreenComponent } from './about-us-screen.component';

const routes: Routes = [
  {
    path: '',
    component:AboutUsScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsScreenRoutingModule { }
