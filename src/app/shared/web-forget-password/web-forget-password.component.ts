import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  selector: 'app-web-forget-password',
  templateUrl: './web-forget-password.component.html',
  styleUrls: ['./web-forget-password.component.scss']
})
export class WebForgetPasswordComponent implements OnInit {

  Loading: boolean = false;

  forgetForm!:FormGroup
  submitted:boolean=false
  countries:any
  @Output() tabNameChild = new EventEmitter()

  constructor(private fb:FormBuilder,private _AuthServices:MobileAuthService,private _Router:Router) {
    this.countries = [
      {
        name: '+2',
        code: 'egypt',
        img: './../../../../../assets/images/egypt.png',
      },
      {
        name: '+966',
        code: 'KSA',
        img: './../../../../../assets/images/download (3).png',
      },
    ];
    this.forgetForm=this.fb.group({
      [ControlKeys.phoneCode]:['',Validators.required],
      [ControlKeys.phoneNumber]:['',Validators.required],
    })
    this.forgetForm.get(ControlKeys.phoneCode)?.setValue(
      {
        name: '+2',
        code: 'egypt',
        img: './../../../../../assets/images/egypt.png',
      }
    );
  }

  forget()
  {
    this.submitted = true;
   let obj={
      phone:this.forgetForm.get('phoneCode')?.value.name+this.forgetForm.get('phoneNumber')?.value,
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
            this.forgetForm.reset()
            if (res.ok === true) {
              localStorage.setItem('phone',obj.phone)
              // this._Router.navigate(['/auth/verify'])
              this.tabNameChild.emit('otp')
            }
      });
    }
    }

    checkCode()
    {
      let code = this.forgetForm.get('phoneCode')?.value.name
      if (code == '+20') {
        this.forgetForm.get('phoneNumber')?.removeValidators([Validators.pattern(/^[0-9]{9}$/)])
        this.forgetForm.get('phoneNumber')?.setValidators([Validators.pattern(/^(1)[0-9]{9}$/)])
        this.forgetForm.get('phoneNumber')?.updateValueAndValidity()
        // this.forgetForm.controls['phoneNumber'].updateValueAndValidity()

      }
      else
      {
        this.forgetForm.get('phoneNumber')?.removeValidators([Validators.pattern(/^(1)[0-9]{9}$/)])
        this.forgetForm.get('phoneNumber')?.setValidators([Validators.pattern(/^[0-9]{9}$/)])
        this.forgetForm.get('phoneNumber')?.updateValueAndValidity()
        // this.forgetForm.controls
      }
    }
    tab(tab:string)
    {
      this.tabNameChild.emit(tab)
    }

  ngOnInit(): void {
  }

}
