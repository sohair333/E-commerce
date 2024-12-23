import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllBrandsRoutingModule } from './all-brands-routing.module';
import { AllBrandsComponent } from './all-brands.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AllBrandsComponent
  ],
  imports: [
    CommonModule,
    AllBrandsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AllBrandsModule { }
