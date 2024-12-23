import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileAuthRoutingModule } from './mobile-auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { VerifyPhoneComponent } from './components/verify-phone/verify-phone.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NgOtpInputModule } from  'ng-otp-input';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyPhoneComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    MobileAuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule
  ]
})
export class MobileAuthModule { }
