import { HttpParams } from '@angular/common/http';
import { Component, IterableDiffers, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckoutService } from 'src/app/Services/checkout.service';
import { ProductDetailsService } from 'src/app/Services/product-details.service';
import { toggleFade } from './toggle-fade';

export enum ControlKeys {
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
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  animations: [toggleFade],
})
export class AddressesComponent implements OnInit {
  hover: boolean = false;
  data: any;
  submitted: boolean = false;
  addressId: any;
  customerDetailsIndex: any;
  newAddrssMode: boolean = false;
  editAddressMode: boolean = false;
  params: any;
  country: any[] = [];
  governs: any[] = [];
  cities: any[] = [];
  countryId: number = 1;
  newAddressForm!: FormGroup;
  isDefault: boolean = false;
  msgs: any;
  selectedAddressId: number = 0;
  showModel: boolean = false;
  selectedLang: string = '';
  countries: any[] = [];
  constructor(
    private _Router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private iterableDiffers: IterableDiffers,
    private _CheckoutService: CheckoutService,
    private _ProductDetailsService: ProductDetailsService
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
    // Form new address when add new address
    this.newAddressForm = this.fb.group({
      [ControlKeys.city_id]: ['', [Validators.required]],
      [ControlKeys.governorate_id]: ['', [Validators.required]],
      [ControlKeys.address_details]: ['', [Validators.required]],
      [ControlKeys.first_name]: ['', [Validators.required]],
      [ControlKeys.last_name]: ['', [Validators.required]],
      [ControlKeys.phoneCode]: ['', [Validators.required]],
      [ControlKeys.phoneNumber]: ['', [Validators.required]],
      [ControlKeys.additonalNumber]: [''],
      [ControlKeys.setAddress]: [false],
    });
    this._CheckoutService.geCoutries().subscribe((countries) => {
      this.country = countries.data;
    });
    this.params = new HttpParams();
    if (this.countryId == 1) {
      this.getGovern();
      this.newAddressForm.get('phoneCode')?.setValue('+2');
    } else {
      this.getGovern();
      this.newAddressForm.get('phoneCode')?.setValue('+966');
    }
    this.selectedLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
    this.getDefaultAddress();
  }

  getDefaultAddress() {
    this._CheckoutService.getAddresses().subscribe((res: any) => {
      // this.newAddressForm.get(ControlKeys.phoneNumber)?.setValue('.ankjla');
      this.data = res.data.map((address: any) => {
        return {
          ...address,
          isHovered: false,
        };
      });
    });
  }
  // Get Government in Country by id
  getGovern() {
    this._CheckoutService.geGovern(this.countryId).subscribe((govern) => {
      this.governs = govern.data;
    });
    if (this.countryId == 1) {
      this.newAddressForm.get('phoneCode')?.setValue('+2');
    } else {
      this.newAddressForm.get('phoneCode')?.setValue('+966');
    }
  }
  getCities(data: any) {
    console.log(data.value.id);

    this._CheckoutService.geCities(data.value.id).subscribe((city) => {
      this.cities = city.data;
    });
  }
  //
  // change content in dailog when add new address
  changeNewAddressMode() {
    this.newAddressForm.reset();
    this.showModel = true;
    this.editAddressMode = false;
    // this.getGovern();
    this._CheckoutService.geGovern(this.countryId).subscribe((govern) => {
      this.governs = govern.data;
    });
    this.submitted = false;
    if (this.countryId == 1) {
      this.newAddressForm.get('phoneCode')?.setValue('+2');
    } else {
      this.newAddressForm.get('phoneCode')?.setValue('+966');
    }
  }
  // cancel add new or edit address and change falg check Mode
  cancelNewAddress() {
    this.newAddressForm.reset();
    this.editAddressMode = false;
    this.showModel = false;
    // this.submitted = true;
  }

  // add new address and edit mode
  setCustomerNewAddress() {
    this.submitted = true;

    if (this.editAddressMode == true) {
      let obj = {
        country_id: this.countryId,
        first_name: this.newAddressForm.get(ControlKeys.first_name)?.value,
        last_name: this.newAddressForm.get(ControlKeys.last_name)?.value,
        phone:
          this.newAddressForm.get(ControlKeys.phoneCode)?.value?.name +
          this.newAddressForm.get(ControlKeys.phoneNumber)?.value,
        governorate_id: this.newAddressForm.get(ControlKeys.governorate_id)
          ?.value?.id,
        address_details: this.newAddressForm.get(ControlKeys.address_details)
          ?.value,
        city_id: this.newAddressForm.get(ControlKeys.city_id)?.value?.id,
        is_default_shipping:
          this.newAddressForm.get(ControlKeys.setAddress)?.value == true
            ? 1
            : 0,
        additonalNumber: this.newAddressForm.get(ControlKeys.additonalNumber)
          ?.value,
      };

      if (this.newAddressForm.valid) {
        console.log(obj.phone);
        this.submitted = false;
        this._CheckoutService
          .updatCustomerAddress(this.addressId, obj)
          .subscribe((res) => {
            this.data[this.customerDetailsIndex] = res.data;
            this._CheckoutService.getAddresses().subscribe((Details: any) => {
              Details.data.map((address: any) => {
                if (address.is_default_shipping == 1) {
                  this.selectedAddressId = address.id;
                }

                this.data = Details.data;
              });
            });
            this.messageService.add({
              severity: 'success',
              summary: 'Updated Addresses',
              detail: 'Your Addresses is Updated successfully',
            });
            this.addressId = res.data.id;
            this.showModel = false;
            this.newAddressForm.reset();
          });
      } else {
        this.submitted = true;
      }
    } else {
      let obj = {
        country_id: this.countryId,
        first_name: this.newAddressForm.get(ControlKeys.first_name)?.value,
        last_name: this.newAddressForm.get(ControlKeys.last_name)?.value,
        phone:
          this.newAddressForm.get(ControlKeys.phoneCode)?.value?.name +
          this.newAddressForm.get(ControlKeys.phoneNumber)?.value,
        governorate_id: this.newAddressForm.get(ControlKeys.governorate_id)
          ?.value?.id,
        city_id: this.newAddressForm.get(ControlKeys.city_id)?.value?.id,
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

        console.log(obj);
        this._CheckoutService.setCustomerAddress(obj).subscribe((res) => {
          if (res.data.is_default_shipping == 1) {
            this.selectedAddressId = res.data.id;
          }

          this.data.push(res.data);
          this.addressId = res.data.id;
          this._CheckoutService.getAddresses().subscribe((Details: any) => {
            Details.data.map((address: any) => {
              if (address.is_default_shipping == 1) {
                this.selectedAddressId = address.id;
              }
            });
            this.data = Details.data;
          });
          this.showModel = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Add Addresses',
            detail: 'Your Addresses is Adding successfully',
          });
          this.newAddressForm.reset();
        });
      } else {
        this.submitted = true;
      }
    }
  }
  // set value in form new address
  handleEditAddressCustomer(data: any, index: number) {
    this.submitted = false;
    this.addressId = data.id;
    this.customerDetailsIndex = index;
    this.showModel = true;
    this.editAddressMode = true;
    this.getGovern();

    this.newAddressForm
      .get(ControlKeys.governorate_id)
      ?.setValue(data.governorate);
    this._CheckoutService.geCities(data.governorate_id).subscribe((city) => {
      this.cities = city.data;
      this.newAddressForm.get(ControlKeys.city_id)?.setValue(data.city);
    });
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

  // Delete Address Clients
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
          this._CheckoutService.getAddresses().subscribe((Details: any) => {
            this.data = Details.data;
            if (Details.data.length > 0) {
              this.data = Details.data;
            } else {
              this.showModel = false;
              this.newAddressForm.reset();
              this.isDefault = false;
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

  hoverOn(index: number) {
    this.data[index].isHovered = true;
  }
  hoverOff(index: number) {
    this.data[index].isHovered = false;
  }

  ngOnInit(): void {}
}
