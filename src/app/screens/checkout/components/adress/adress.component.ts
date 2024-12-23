import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckoutService } from 'src/app/Services/checkout.service';

export enum ControlKeys {
  SearchInput = 'SearchInput',
  first_name = 'first_name',
  last_name = 'last_name',
  phoneNumber = 'phoneNumber',
  phoneCode = 'phoneCode',
  address_details = 'address_details',
  country_id = 'country_id',
  governorate_id = 'governorate_id',
  city_id = 'city_id',
  additonalNumber = 'additonalNumber',
  setAddress = 'setAddress',
}

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss'],
})
export class AdressComponent implements OnInit {
  addressId: number = 0;
  customerID: any;
  msgs: any;
  params: any;
  allAddresses: any[] = [];
  isListing: boolean = false;
  newAddressForm: FormGroup;
  submitted: boolean = false;
  country: any[] = [];
  governs: any[] = [];
  cities: any[] = [];
  countryId: number = 1;
  getGovernId: any;
  editAddressMode: boolean = false;
  newAddrssMode: boolean = false;
  customerDetails: any[] = [];
  customerDetailsIndex: number = 0;
  selectedAddressId: number = 0;
  checkLang:any

  constructor(
    private _router: Router,
    private _CheckoutService: CheckoutService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.checkLang=localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
    this.customerID = JSON.parse(localStorage.getItem('user') || '')?.data?.id;
    this.getAddresses();
    this.isListing = true;
    this.newAddressForm = this.fb.group({
      [ControlKeys.city_id]: ['', [Validators.required]],
      [ControlKeys.governorate_id]: ['', [Validators.required]],
      [ControlKeys.address_details]: ['', [Validators.required]],
      [ControlKeys.first_name]: ['', [Validators.required]],
      [ControlKeys.last_name]: ['', [Validators.required]],
      [ControlKeys.phoneCode]: ['', [Validators.required]],
      [ControlKeys.setAddress]: [''],
      [ControlKeys.phoneNumber]: ['', [Validators.required]],
      [ControlKeys.additonalNumber]: [''],
    });
  }

  getAddresses() {
    this._CheckoutService.getAddresses().subscribe((res: any) => {
      this.allAddresses = res.data;
      this.countryId = 1;
      console.log(this.allAddresses);
    });
  }

  addAddress() {
    this.isListing = false;
    this.newAddressForm.reset();
    this.editAddressMode = false;
    this.countryId = 1;
    this.getGovern();
  }

  backToList() {
    this.isListing = true;
    this.newAddressForm.reset();
    // this.getAddresses();
  }

  ngOnInit(): void {
    this.getGovern();
  }

  back() {
    this._router.navigateByUrl('/checkout');
  }

  setCustomerAddress() {
    console.log(this.newAddressForm.value);
  }
  // Get Government in Country by id
  getGovern() {
    this._CheckoutService.geGovern(1).subscribe((govern) => {
      this.governs = govern.data;
    });
    if (this.countryId == 1) {
      this.newAddressForm.get('phoneCode')?.setValue('+2');
    } else {
      this.newAddressForm.get('phoneCode')?.setValue('+966');
    }
  }

  // Get all Cities in Government by id
  getCities(data: any) {
    console.log(data.value);
    this.getGovernId = data.value;
    this._CheckoutService.geCities(data.value).subscribe((city) => {
      this.cities = city.data;
    });
  }
  deleteAddressClient(data: any) {
    this.confirmationService.confirm({
      message: 'do you want to delete this Address ? ',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._CheckoutService.deleteAddress(data.id).subscribe((data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'this Address is Deleted successfully',
          });
          console.log(data);

          this._CheckoutService.getAddresses().subscribe((Details: any) => {
            console.log(Details);
            this.allAddresses = Details.data;
            if (Details.data.length > 0) {
              this.allAddresses = Details.data;
            } else {
              //this.changeAddressMode = false
              this.newAddressForm.reset();
              //this.isDefault = false
            }
          });
        });
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Rejected',
            detail: 'You have rejected',
          },
        ];
      },
    });
  }

  handleEditAddressCustomer(data: any) {
    this.submitted = false;
    this.addressId = data.id;
    this.isListing = false;
    this.editAddressMode = true;
    this.getGovern();
    this.newAddressForm
      .get(ControlKeys.governorate_id)
      ?.setValue(data.governorate_id);
    this._CheckoutService.geCities(data.governorate_id).subscribe((city) => {
      this.cities = city.data;
    });
    this.newAddressForm.get(ControlKeys.city_id)?.setValue(data.city_id);
    this.newAddressForm.get(ControlKeys.first_name)?.setValue(data.first_name);
    this.newAddressForm.get(ControlKeys.last_name)?.setValue(data.last_name);
    this.newAddressForm
      .get(ControlKeys.phoneCode)
      ?.setValue(data.formatted_phone?.code);
    this.newAddressForm
      .get(ControlKeys.phoneNumber)
      ?.setValue(data.formatted_phone?.number);
    this.newAddressForm
      .get(ControlKeys.setAddress)
      ?.setValue(data.is_default_shipping == 1 ? true : false);
    this.newAddressForm
      .get(ControlKeys.address_details)
      ?.setValue(data.address_details);
    this.newAddressForm
      .get(ControlKeys.additonalNumber)
      ?.setValue(data.additonalNumber);
  }

  // add new address and edit mode
  setCustomerNewAddress() {
    console.log(this.newAddressForm.value);

    this.submitted = true;
    if (this.editAddressMode == true) {
      let obj = {
        client_id: this.customerID,
        country_id: this.countryId,
        first_name: this.newAddressForm.get(ControlKeys.first_name)?.value,
        last_name: this.newAddressForm.get(ControlKeys.last_name)?.value,
        phone:
          this.newAddressForm.get(ControlKeys.phoneCode)?.value +
          this.newAddressForm.get(ControlKeys.phoneNumber)?.value,
        governorate_id: this.newAddressForm.get(ControlKeys.governorate_id)
          ?.value,
        address_details: this.newAddressForm.get(ControlKeys.address_details)
          ?.value,
        city_id: this.newAddressForm.get(ControlKeys.city_id)?.value,
        is_default_shipping:
          this.newAddressForm.get(ControlKeys.setAddress)?.value == true
            ? 1
            : 0,
        additonalNumber: this.newAddressForm.get(ControlKeys.additonalNumber)
          ?.value,
      };

      if (this.newAddressForm.valid) {
        this.submitted = false;
        this._CheckoutService
          .updatCustomerAddress(this.addressId, obj)
          .subscribe((res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Updated Address Information',
              detail: 'Your new Address is saved successfully',
            });
            this.customerDetails[this.customerDetailsIndex] = res.data;
            this.getAddresses();
            this.addressId = res.data.id;
            this.newAddressForm.reset();
            this.isListing = true;
          });
      } else {
        this.submitted = true;
      }
    } else {
      let obj = {
        client_id: this.customerID,
        country_id: this.countryId,
        first_name: this.newAddressForm.get(ControlKeys.first_name)?.value,
        last_name: this.newAddressForm.get(ControlKeys.last_name)?.value,
        phone:
          this.newAddressForm.get(ControlKeys.phoneCode)?.value +
          this.newAddressForm.get(ControlKeys.phoneNumber)?.value,
        governorate_id: this.newAddressForm.get(ControlKeys.governorate_id)
          ?.value,
        city_id: this.newAddressForm.get(ControlKeys.city_id)?.value,
        additonalNumber: this.newAddressForm.get(ControlKeys.additonalNumber)
          ?.value,
        is_default_shipping:
          this.newAddressForm.get(ControlKeys.setAddress)?.value == true
            ? 1
            : 0,
        address_details: this.newAddressForm.get(ControlKeys.address_details)
          ?.value,
      };
      if (this.newAddressForm.valid) {
        this.submitted = false;

        this._CheckoutService.setCustomerAddress(obj).subscribe((res) => {
          if (res.data.is_default_shipping == 1) {
            this.selectedAddressId = res.data.id;
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Updated Address Information',
            detail: 'Your new Address is saved successfully',
          });
          this.customerDetails.push(res.data);
          this.addressId = res.data.id;

          this.newAddressForm.reset();
          this.isListing = true;
        });
      } else {
        this.submitted = true;
      }
    }
  }
}
