import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { finalize, pipe } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile.service';

export enum ControlKeys {
  first_name = 'first_name',
  last_name = 'last_name',
  email = 'email',
  phone = 'phone',
  code = 'code',
  current_password = 'current_password',
  password = 'new_password_confirmation',
  newPassword = 'new_password',
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: any;
  profileForm!: FormGroup;
  profile!: FormGroup;
  openDialog: boolean = false;
  countries!: any[];
  code: boolean = false;
  submited: boolean = false;
  @Output() step = new EventEmitter();
  formSubmitted: any = {};
  checkLang:any;
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
      [ControlKeys.first_name]: ['', Validators.required],
      [ControlKeys.last_name]: ['', Validators.required],
      [ControlKeys.phone]: ['', Validators.required],
      [ControlKeys.code]: ['', Validators.required],
      [ControlKeys.email]: [''],
    });

    this.profileForm = this.fb.group(
      {
        [ControlKeys.password]: ['', Validators.required],
        [ControlKeys.current_password]: ['', Validators.required],
        [ControlKeys.newPassword]: ['', Validators.required],
      },
      { validators: this.passwordConfirming }
    );

    this.getClientData();
  }

  passwordConfirming(c: AbstractControl): { valid: boolean } {
    if (
      c.get([ControlKeys.password])?.value !==
      c.get([ControlKeys.newPassword])?.value
    ) {
      return { valid: false };
    }
    return { valid: true };
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

  ngOnInit(): void {}
  backToMenu() {
    this.step.emit(true);
  }
  openPopup() {
    this.openDialog = true;
  }
  closeDialog() {
    this.openDialog = false;
    this.submited = false;
  }

  setNewPassword(object: any) {
    this.submited = true;

    if (
      this.profileForm.get([ControlKeys.password])?.value ===
        this.profileForm.get([ControlKeys.newPassword])?.value &&
      !this.profileForm.get([ControlKeys.current_password])?.errors
    ) {
      this.isLoading = true;
      this._profileService
        .changePassword(object.value)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe((response: any) => {
          this.openDialog = false;
          this.profileForm.reset();
          this.submited = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Updated Profile',
            detail: 'Your new Password is saved successfully',
          });
        });
    }
  }

  isLoading: boolean = false;
  saveProfile(data: any) {
    if (this.profile.invalid) {
      return;
    }
    this.isLoading = true;
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
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((profile) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Updated Profile',
          detail: 'Your Info is saved successfully',
        });
      });
  }


}
