import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Subscription, take, timer } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth-service.service';
import { MobileAuthService } from 'src/app/Services/mobile-auth.service';

@Component({
  selector: 'app-web-otp',
  templateUrl: './web-otp.component.html',
  styleUrls: ['./web-otp.component.scss']
})
export class WebOtpComponent implements OnInit {

  token:any
  Loading: boolean = false;
  checkOtp: boolean = false;
  phone:any
  display: any;
  countDown!: Subscription;
  counter = 90;
  tick = 1000;
  user=JSON.parse(localStorage.getItem('register') || '{}')
  otp:string=''
  @Output() tabNameChild = new EventEmitter()
  @Output() closeDialog = new EventEmitter()

  constructor(private _AuthServices:MobileAuthService,private _Router:Router,private _authService: AuthService) {
    this.token=localStorage.getItem('AccessToken');
    this.phone=localStorage.getItem('phone')
    this.startTimer()
  }

  onOtpChange(event:any)
  {
    this.otp=event
  }

  submit()
  {
    if(localStorage.getItem('AccessToken'))
    {
    let obj={
      otp_code: this.otp,
      phone:this.phone
    }
    this.checkOtp=true
    if (this.otp.length === 4) {
      this.checkOtp=false
      this.Loading = true;
      this._authService.setToken(this.token)
      localStorage.setItem('otp',this.otp)
      this._AuthServices.verifyPhone(obj).pipe(
        finalize(() => {
          this.Loading= false;
      })
      ).subscribe((res)=>{
        if (res.ok === true) {
          this.Loading = false;
          this.closeDialog.emit(false)
          // this._Router.navigate(['/auth/login']);
          // this.tabNameChild.emit('reset')
        }

      })
    }
  }
  else
  {
    let obj={
      otp_code: this.otp,
      phone:this.phone
  }
    if (this.otp.length === 4) {
      this.Loading = true;
      // this._authService.setToken(this.token)
      localStorage.setItem('otp',this.otp)
      this._AuthServices.verifyPhone(obj).pipe(
        finalize(() => {
          this.Loading= false;
      })
      ).subscribe((res)=>{
        if (res.ok === true) {
          this.Loading = false;
          this.tabNameChild.emit('reset')
        }

      })
    }
  }
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

  startTimer() {
    let obj={
      otp_code: this.otp,
      phone:this.phone
  }
    this._AuthServices.sendOtp(obj).subscribe((res)=>{
    })
    this.counter = 90;
    this.countDown = timer(0, this.tick)
      .pipe(take(this.counter))
      .subscribe(() => {
        --this.counter;
        if (this.counter == 0) {
          this.countDown.unsubscribe();
        }
      });
  }
  ngOnInit(): void {
  }


}
