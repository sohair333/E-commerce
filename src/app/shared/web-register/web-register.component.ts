import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth-service.service';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { MobileAuthService } from 'src/app/Services/mobile-auth.service';

export enum ControlKeys {
  first_name = 'first_name',
  last_name = 'last_name',
  phoneCode = 'phoneCode',
  phoneNumber = 'phoneNumber',
  password = 'password',
  email = 'email',
}
@Component({
  selector: 'app-web-register',
  templateUrl: './web-register.component.html',
  styleUrls: ['./web-register.component.scss'],
})
export class WebRegisterComponent implements OnInit {
  @Input() display: boolean = false;
  registerForm!: FormGroup;
  submitted: boolean = false;
  Loading: boolean = false;
  showPassword: boolean = false;
  countries: any;
  @Output() tabNameChild = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private _AuthServices: MobileAuthService,
    private _Router: Router,
    private _authService: AuthService,
    private FirebaseService:FirebaseService,
    private datePipe:DatePipe
  ) {
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
    this.registerForm = this.fb.group({
      [ControlKeys.phoneCode]: ['', [Validators.required]],
      [ControlKeys.phoneNumber]: ['', [Validators.required]],
      [ControlKeys.email]: [''],
      [ControlKeys.password]: ['', [Validators.required]],
      [ControlKeys.first_name]: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      [ControlKeys.last_name]: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
    });
    this.registerForm.get(ControlKeys.phoneCode)?.setValue({
      name: '+2',
      code: 'egypt',
      img: './../../../../../assets/images/egypt.png',
    });
  }

  checkPassword() {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.submitted = true;
    let obj = {
      phone:
        this.registerForm.get('phoneCode')?.value.name +
        this.registerForm.get('phoneNumber')?.value,
      password: this.registerForm.get('password')?.value,
      first_name: this.registerForm.get('first_name')?.value,
      last_name: this.registerForm.get('last_name')?.value,
      email: this.registerForm.get('email')?.value,
    };
    if (this.registerForm.valid) {
      this.Loading = true;
      this._AuthServices
        .register(obj)
        .pipe(
          finalize(() => {
            this.submitted = false;
            this.Loading = false;
          })
        )
        .subscribe((res) => {
          localStorage.setItem('user', JSON.stringify(res.body.data));
          this._authService.setToken(res.body.token);
          this.registerForm.reset();
          if (res.ok === true) {
            // client/send-otp
            this.tabNameChild.emit('otp');
            // this._Router.navigate(['/auth/verify']);
            localStorage.setItem('phone', obj.phone);
          }
        });
    }
  }

  checkCode() {
    let code = this.registerForm.get('phoneCode')?.value.name;
    if (code == '+20') {
      this.registerForm
        .get('phoneNumber')
        ?.removeValidators([Validators.pattern(/^[0-9]{9}$/)]);
      this.registerForm
        .get('phoneNumber')
        ?.setValidators([Validators.pattern(/^(1)[0-9]{9}$/)]);
      this.registerForm.get('phoneNumber')?.updateValueAndValidity();
      // this.registerForm.controls['phoneNumber'].updateValueAndValidity()
    } else {
      this.registerForm
        .get('phoneNumber')
        ?.removeValidators([Validators.pattern(/^(1)[0-9]{9}$/)]);
      this.registerForm
        .get('phoneNumber')
        ?.setValidators([Validators.pattern(/^[0-9]{9}$/)]);
      this.registerForm.get('phoneNumber')?.updateValueAndValidity();
    }
  }

  tab(tab: string) {
    this.tabNameChild.emit(tab);
  }
  ngOnInit(): void {
    this.setRealTimeData()
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
      userIsLogin: 0,
    }
    this.FirebaseService.setUSerData(this.FirebaseService.userObject)
  }
}
