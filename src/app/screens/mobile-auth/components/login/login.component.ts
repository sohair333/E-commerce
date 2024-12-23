import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth-service.service';
import { MobileAuthService } from 'src/app/Services/mobile-auth.service';

export enum ControlKeys {
  phoneCode = 'phoneCode',
  phoneNumber = 'phoneNumber',
  password = 'password',
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Loading: boolean = false;
  loginForm!:FormGroup
  submitted:boolean=false
  phone:any;
  countries:any[]=[]
  showPassword:boolean = false
  constructor(private fb:FormBuilder,private _AuthServices:MobileAuthService,private _Router:Router,private _authService: AuthService) {
    this.phone=localStorage.getItem('phone')
    this.loginForm=this.fb.group({
      [ControlKeys.phoneCode]:['',Validators.required],
      [ControlKeys.phoneNumber]:['',Validators.required],
      [ControlKeys.password]:['',Validators.required],
    })
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

  }
  checkPassword()
  {
    this.showPassword=!this.showPassword
  }
  goToForgetPassword() {
    localStorage.clear()
    this._Router.navigate(['/auth/forget']);

  }
  login() {
    this.submitted = true;
    let obj = {
      phone: this.loginForm.get('phoneCode')?.value + this.loginForm.get('phoneNumber')?.value,
      password: this.loginForm.get('password')?.value
    }
    if (this.loginForm.valid) {
      this.Loading = true
      this._AuthServices.login(obj).pipe(
        finalize(() => {
          this.Loading = false
          this.submitted = false;
        })
      )
      .subscribe((res) => {
        this._authService.setToken(res.body.token)
        this._authService.saveUserData(res.body.data)
        localStorage.setItem('user',JSON.stringify(res.body.data))
        if (res.ok === true) {
          console.log(res);
          this.loginForm.reset()
          this._Router.navigate(['/homePage']);
        }

      });
    }
    }

    checkCode()
    {
      let code = this.loginForm.get('phoneCode')?.value
      if (code == '+20') {
        this.loginForm.get('phoneNumber')?.removeValidators([Validators.pattern(/^[0-9]{9}$/)])
        this.loginForm.get('phoneNumber')?.setValidators([Validators.pattern(/^(1)[0-9]{9}$/)])
        console.log(this.loginForm.controls);
        this.loginForm.get('phoneNumber')?.updateValueAndValidity()
        // this.loginForm.controls['phoneNumber'].updateValueAndValidity()
        console.log('if');

      }
      else
      {
        this.loginForm.get('phoneNumber')?.removeValidators([Validators.pattern(/^(1)[0-9]{9}$/)])
        this.loginForm.get('phoneNumber')?.setValidators([Validators.pattern(/^[0-9]{9}$/)])
        this.loginForm.get('phoneNumber')?.updateValueAndValidity()
        // this.loginForm.controls
        console.log('else');
      }
    }
  ngOnInit(): void {
  }
  backToHome(){
    this._Router.navigate(['/homePage']);

  }
}




