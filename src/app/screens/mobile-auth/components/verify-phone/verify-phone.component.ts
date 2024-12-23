import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
// import { NgxOtpInputConfig } from 'ngx-otp-input';
import { AuthService } from 'src/app/core/auth/services/auth-service.service';
import { MobileAuthService } from 'src/app/Services/mobile-auth.service';

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss'],
})
export class VerifyPhoneComponent implements OnInit {
  token: any;
  Loading: boolean = false;
  checkOtp: boolean = false;
  phone: any;
  display: any;
  user = JSON.parse(localStorage.getItem('register') || '{}');
  otp: string = '';
  constructor(
    private _AuthServices: MobileAuthService,
    private _Router: Router,
    private _authService: AuthService
  ) {
    this.token = localStorage.getItem('AccessToken');
    this.phone = localStorage.getItem('phone');
    this.timer(1);
  }
  onOtpChange(event: any) {
    this.otp = event;
  }

  submit() {
    if (localStorage.getItem('AccessToken')) {
      let obj = {
        otp_code: this.otp,
        // phone:this.user.phone
      };
      this.checkOtp = true;
      if (this.otp.length === 4) {
        this.checkOtp = false;
        this.Loading = true;
        console.log(this.otp);
        this._authService.setToken(this.token);
        localStorage.setItem('otp', this.otp);
        this._AuthServices
          .verifyPhone(obj)
          .pipe(
            finalize(() => {
              this.Loading = false;
            })
          )
          .subscribe((res) => {
            console.log(res);
            if (res.ok === true) {
              this.Loading = false;
              this._Router.navigate(['/auth/login']);
            }
          });
      }
    } else {
      let obj = {
        otp_code: this.otp,
        phone: this.phone,
      };
      if (this.otp.length === 4) {
        this.Loading = true;
        console.log(this.otp);
        // this._authService.setToken(this.token)
        localStorage.setItem('otp', this.otp);
        this._AuthServices
          .verifyPhone(obj)
          .pipe(
            finalize(() => {
              this.Loading = false;
            })
          )
          .subscribe((res) => {
            console.log(res);
            if (res.ok === true) {
              this.Loading = false;
              this._Router.navigate(['/auth/resetPassword']);
            }
          });
      }
    }
  }

  timer(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 30;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);
      }
    }, 1000);
  }

  ngOnInit(): void {}
  backToHome() {
    this._Router.navigate(['/homePage']);
  }
}
