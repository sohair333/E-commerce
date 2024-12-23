import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MobileAuthService } from 'src/app/Services/mobile-auth.service';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth-service.service';
export enum ControlKeys
{
  first_name='first_name',
  last_name='last_name',
  phoneCode = 'phoneCode',
  phoneNumber = 'phoneNumber',
  password= 'password',
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup
  submitted:boolean = false
  Loading: boolean = false;
  showPassword:boolean = false
  constructor(private fb:FormBuilder,private _AuthServices:MobileAuthService,private _Router:Router,private _authService: AuthService) {
    this.registerForm=this.fb.group({
      [ControlKeys.phoneCode]:['',[Validators.required]],
      [ControlKeys.phoneNumber]:['',[Validators.required]],
      [ControlKeys.password]:['',[Validators.required]],
      [ControlKeys.first_name]:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      [ControlKeys.last_name]:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
    })
  }

  checkPassword()
  {
    this.showPassword=!this.showPassword
  }

  register()
  {
    this.submitted = true;
   let obj={
      phone:this.registerForm.get('phoneCode')?.value+this.registerForm.get('phoneNumber')?.value,
      password:this.registerForm.get('password')?.value,
      first_name:this.registerForm.get('first_name')?.value,
      last_name:this.registerForm.get('last_name')?.value,
    }
    if (this.registerForm.valid) {
      this.Loading= true;
      this._AuthServices.register(obj).pipe(
        finalize(() => {
            this.submitted = false;
            this.Loading= false;
        })
      )
      .subscribe((res) => {
        console.log(res);
        localStorage.setItem('user',JSON.stringify(res.body.data))
        this._authService.setToken(res.body.token)
        this.registerForm.reset()
        if (res.ok === true) {

          this._Router.navigate(['/auth/verify']);
        }

      });
    }
    }

    checkCode()
    {
      let code = this.registerForm.get('phoneCode')?.value
      if (code == '+20') {
        this.registerForm.get('phoneNumber')?.removeValidators([Validators.pattern(/^[0-9]{9}$/)])
        this.registerForm.get('phoneNumber')?.setValidators([Validators.pattern(/^(1)[0-9]{9}$/)])
        console.log(this.registerForm.controls);
        this.registerForm.get('phoneNumber')?.updateValueAndValidity()
        // this.registerForm.controls['phoneNumber'].updateValueAndValidity()
        console.log('if');

      }
      else
      {
        this.registerForm.get('phoneNumber')?.removeValidators([Validators.pattern(/^(1)[0-9]{9}$/)])
        this.registerForm.get('phoneNumber')?.setValidators([Validators.pattern(/^[0-9]{9}$/)])
        this.registerForm.get('phoneNumber')?.updateValueAndValidity()
        // this.registerForm.controls
        console.log('else');
      }
    }
  ngOnInit(): void {
  }
  backToHome(){
    this._Router.navigate(['/homePage']);

  }
}
