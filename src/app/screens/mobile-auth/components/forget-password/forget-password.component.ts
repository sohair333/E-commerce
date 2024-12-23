import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MobileAuthService } from 'src/app/Services/mobile-auth.service';

export enum ControlKeys
{
  phoneCode = 'phoneCode',
  phoneNumber = 'phoneNumber',
}
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  Loading: boolean = false;

  forgetForm!:FormGroup
  submitted:boolean=false
  constructor(private fb:FormBuilder,private _AuthServices:MobileAuthService,private _Router:Router) {
    this.forgetForm=this.fb.group({
      [ControlKeys.phoneCode]:['',Validators.required],
      [ControlKeys.phoneNumber]:['',Validators.required],
    })
  }

  forget()
  {
    this.submitted = true;
   let obj={
      phone:this.forgetForm.get('phoneCode')?.value+this.forgetForm.get('phoneNumber')?.value,
      otp_code:localStorage.getItem('otp')
    }
    if (this.forgetForm.valid) {
      this.Loading=true

      this._AuthServices.sendOtp(obj).pipe(
        finalize(() => {
            this.submitted = false;
            this.Loading=false
          })
          )
          .subscribe((res) => {
            console.log(res);
            this.forgetForm.reset()
            if (res.ok === true) {
              localStorage.setItem('phone',obj.phone)
              this._Router.navigate(['/auth/verify'])
            }
      });
    }
    }

    checkCode()
    {
      let code = this.forgetForm.get('phoneCode')?.value
      if (code == '+20') {
        this.forgetForm.get('phoneNumber')?.removeValidators([Validators.pattern(/^[0-9]{9}$/)])
        this.forgetForm.get('phoneNumber')?.setValidators([Validators.pattern(/^(1)[0-9]{9}$/)])
        console.log(this.forgetForm.controls);
        this.forgetForm.get('phoneNumber')?.updateValueAndValidity()
        // this.forgetForm.controls['phoneNumber'].updateValueAndValidity()
        console.log('if');

      }
      else
      {
        this.forgetForm.get('phoneNumber')?.removeValidators([Validators.pattern(/^(1)[0-9]{9}$/)])
        this.forgetForm.get('phoneNumber')?.setValidators([Validators.pattern(/^[0-9]{9}$/)])
        this.forgetForm.get('phoneNumber')?.updateValueAndValidity()
        // this.forgetForm.controls
        console.log('else');
      }
    }

  ngOnInit(): void {
  }
  backToHome(){
    this._Router.navigate(['/homePage']);

  }
}
