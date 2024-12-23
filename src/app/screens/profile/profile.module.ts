import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { InfoComponent } from './components/info/info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressesComponent } from './components/addresses/addresses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import { CreditComponent } from './components/credit/credit.component';

@NgModule({
  declarations: [
    ProfileComponent,
    InfoComponent,
    AddressesComponent,
    CreditComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,

  ]
})
export class ProfileModule { }
