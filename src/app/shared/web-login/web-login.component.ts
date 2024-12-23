import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth-service.service';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { MobileAuthService } from 'src/app/Services/mobile-auth.service';

export enum ControlKeys {
  phoneCode = 'phoneCode',
  phoneNumber = 'phoneNumber',
  password = 'password',
}
@Component({
  selector: 'app-web-login',
  templateUrl: './web-login.component.html',
  styleUrls: ['./web-login.component.scss']
})
export class WebLoginComponent implements OnInit {

  Loading: boolean = false;
  loginForm!: FormGroup
  submitted: boolean = false
  phone: any
  countries:any
  showPassword: boolean = false
  checkLogin:number=0
  @Output() tabNameChild = new EventEmitter()
  @Output() closeDialog = new EventEmitter()
  constructor(private fb: FormBuilder, private _AuthServices: MobileAuthService, private _Router: Router, private _authService: AuthService,private FirebaseService:FirebaseService,private datePipe:DatePipe) {
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

    this.phone = localStorage.getItem('phone')
    this.loginForm = this.fb.group({
      [ControlKeys.phoneCode]: ['', Validators.required],
      [ControlKeys.phoneNumber]: ['', Validators.required],
      [ControlKeys.password]: ['', Validators.required],
    })


    this.loginForm.get(ControlKeys.phoneCode)?.setValue(
      {
        name: '+2',
        code: 'egypt',
        img: './../../../../../assets/images/egypt.png',
      }
    );

  }
  checkPassword() {
    this.showPassword = !this.showPassword
  }

  login() {
    this.submitted = true;
    let obj = {
      phone: this.loginForm.get('phoneCode')?.value.name + this.loginForm.get('phoneNumber')?.value,
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
          localStorage.setItem('user', JSON.stringify(res.body.data))
          if (res.ok === true && res.body.data.is_verified === true) {
            this.closeDialog.emit(false)
            this.loginForm.reset()
            window.location.reload()
            // this._Router.navigate(['/homePage']);
            // window.location.reload();
          }
          else {

            this.tabNameChild.emit('otp')
            localStorage.setItem('phone', obj.phone)
          }

        });
    }
  }

  checkCode() {
    let code = this.loginForm.get('phoneCode')?.value
    if (code == '+2') {
      this.loginForm.get('phoneNumber')?.removeValidators([Validators.pattern(/^[0-9]{9}$/)])
      this.loginForm.get('phoneNumber')?.setValidators([Validators.pattern(/^(01)[0-9]{9}$/)])
      this.loginForm.get('phoneNumber')?.updateValueAndValidity()
      // this.loginForm.controls['phoneNumber'].updateValueAndValidity()
    }
    else {
      this.loginForm.get('phoneNumber')?.removeValidators([Validators.pattern(/^(01)[0-9]{9}$/)])
      this.loginForm.get('phoneNumber')?.setValidators([Validators.pattern(/^[0-9]{9}$/)])
      this.loginForm.get('phoneNumber')?.updateValueAndValidity()
      // this.loginForm.controls
    }
  }

  tab(tab: string) {
    this.tabNameChild.emit(tab)
    localStorage.removeItem('AccessToken')
  }
  ngOnInit(): void {

  }
  setRealTimeData() {
    this.FirebaseService.userObject = {
      addToCart: "0",
      checkOut: "0",
      online: 1,
      platformType: 'WEB_DESKTOP', // should be enum model
      productView: "0",
      purchase: "0",
      updatedDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      userId: localStorage.getItem('uniqueId'),
      userIsLogin: 1,
    }
    this.FirebaseService.setUSerData(this.FirebaseService.userObject)
  }

}
