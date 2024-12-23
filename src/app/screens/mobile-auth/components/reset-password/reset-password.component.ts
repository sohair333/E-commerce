import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth-service.service';
import { MobileAuthService } from 'src/app/Services/mobile-auth.service';

export enum ControlKeys
{
  password= 'password',
}
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  Loading: boolean = false;
  phone:any
  resetPasswordForm!:FormGroup
  submitted:boolean=false
  showPassword:boolean = false
  constructor(private fb:FormBuilder,private _AuthServices:MobileAuthService,private _Router:Router,private _authService: AuthService) {
    this.resetPasswordForm=this.fb.group({
      [ControlKeys.password]:['',Validators.required],
    })
    this.phone=localStorage.getItem('phone')

  }

  checkPassword()
  {
    this.showPassword=!this.showPassword
  }

  resetPassword()
  {
    this.submitted = true;
   let obj={
      password:this.resetPasswordForm.get('password')?.value,
      otp_code:localStorage.getItem('otp'),
      phone:this.phone
    }
    if (this.resetPasswordForm.valid) {
      this.Loading = true;
      this._AuthServices.resetPassword(obj).pipe(
        finalize(() => {
          this.Loading = false;
            this.submitted = false;
          })
          )
          .subscribe((res) => {
            console.log(res);

            if (res.ok === true) {
              this._authService.setToken(res.body.token)
              localStorage.setItem('user',JSON.stringify(res.body.data))
              this.resetPasswordForm.reset()
              this._Router.navigate(['/homePage']);

        }

      });
    }
    }

  ngOnInit(): void {
  }

}
