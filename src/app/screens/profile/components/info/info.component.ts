import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile.service';
export enum ControlKeys {
  first_name = 'first_name',
  last_name = 'last_name',
  email = 'email',
  phone = 'phone',
  code = 'code',
  current_password = 'current_password',
  password = 'new_password_confirmation',
  new_password = 'new_password',
}
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  profileData: any;
  profileForm!: FormGroup;
  profile!: FormGroup;
  openDialog: boolean = false;
  countries!: any[];
  code: boolean = false;
  submited: boolean = false;
  changePassword: boolean = false;
  Loading: boolean = false;
  checkLang:any;
  disabled:boolean = true

  constructor(
    private _profileService: ProfileService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.checkLang=localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
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
    this.profile = this.fb.group({
      [ControlKeys.first_name]: ['', [Validators.required]],
      [ControlKeys.last_name]: ['', [Validators.required]],
      [ControlKeys.phone]: ['', [Validators.required]],
      [ControlKeys.code]: ['', [Validators.required]],
      [ControlKeys.email]: [''],
    });

    this.profileForm = this.fb.group(
      {
        // [ControlKeys.password]: ['', [Validators.required]],
        [ControlKeys.current_password]: ['', [Validators.required]],
        [ControlKeys.new_password]: ['', [Validators.required]],
      },
      // { validators: this.passwordConfirming }
    );
    this.getClientData()
   }

   getClientData() {
    this._profileService.getCLientProfile().subscribe((res: any) => {
      this.code = res.data.formatted_phone.code === '+2' ? true : false;
      this.profile.get(ControlKeys.code)?.setValue({
        code: this.code ? 'egypt' : 'KSA',
        img: this.code
          ? './../../../../../assets/images/egypt.png'
          : './../../../../../assets/images/download (3).png',
        name: res.data.formatted_phone.code,
      });
      this.profile.get(ControlKeys.first_name)?.setValue(res.data.first_name);
      this.profile.get(ControlKeys.last_name)?.setValue(res.data.last_name);
      this.profile
        .get(ControlKeys.phone)
        ?.setValue(res.data.formatted_phone.number);
      this.profile.get(ControlKeys.email)?.setValue(res.data.email);
    });
  }

  changePasswordFlag()
  {
    this.changePassword=true
  }
  closeChangePassword()
  {
    this.changePassword=false

  }
  saveProfile() {
    console.log(this.profile.value);

    if (this.profile.invalid) {
      return;
    }
    this.Loading = true;
    let info = {
      first_name: this.profile.get(ControlKeys.first_name)?.value,
      last_name: this.profile.get(ControlKeys.last_name)?.value,
      email: this.profile.get(ControlKeys.email)?.value,
      phone: `${this.profile.get(ControlKeys.code)?.value.name}${
        this.profile.get(ControlKeys.phone)?.value
      }`,
    };
    this._profileService
      .saveUpdatedProfile(info)
      .pipe(
        finalize(() =>
         (this.Loading = false
          ))
        )
      .subscribe((res) => {
        this.getClientData()
        this.messageService.add({
          severity: 'success',
          summary: 'Updated Profile',
          detail: 'Your Info is saved successfully',
        });
      });
  }



  setNewPassword() {
    this.submited = true;
    let obj =
    {
      current_password:this.profileForm.get('current_password')?.value,
      new_password:this.profileForm.get('new_password')?.value,
      new_password_confirmation:this.profileForm.get('new_password')?.value,
    }
    if (this.profileForm.valid) {
      this._profileService.changePassword(obj).subscribe(
         (res) => {
          console.log(res);
          if (res.message) {

            this.changePassword = false;
            this.profileForm.reset();
            this.submited=false
            this.messageService.add({
              severity: 'success',
              summary: 'Updated Password',
              detail: 'Your Password is saved successfully',
            });
          }
        },
      );
    }
  }

  ngOnInit(): void {
  }

}
