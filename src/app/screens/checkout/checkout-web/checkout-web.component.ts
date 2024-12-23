import { HttpParams } from '@angular/common/http';
import { Component, IterableDiffers, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { finalize, map, Observable, Subscription } from 'rxjs';
import { CheckoutService } from 'src/app/Services/checkout.service';
import { ProductDetailsService } from 'src/app/Services/product-details.service';
import { DatePipe, Location } from '@angular/common';
import { FirebaseService } from 'src/app/Services/firebase.service';

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
  selector: 'app-checkout-web',
  templateUrl: './checkout-web.component.html',
  styleUrls: ['./checkout-web.component.scss']
})
export class CheckoutWebComponent implements OnInit {
  display: boolean = true;
  placeOrderLoading: boolean = false;
  Products: any[] = [];
  addressForm!: FormGroup;
  addressMode: boolean = false;
  changeAddressMode: boolean = false;
  selectMode: boolean = true;
  newAddrssMode: boolean = false;
  newAddressForm!: FormGroup;
  selectedProducts: any[] = [];
  addressId: number = 0;
  country: any[] = [];
  governs: any[] = [];
  cities: any[] = [];
  submitted: boolean = false;
  customerDetails: any[] = [];
  customerDetailsIndex: number = 0;
  customerDetailsSet: any[] = [];
  countryId: number = 1;
  editAddressMode: boolean = false;
  quantity: number = 1;
  paymentMethods: any[] = [];
  checkCredits: any;
  selectedAddressId: number = 0;
  msgs: any;
  hideOrderSummary: boolean = false;
  orderSummaryDetails: any;
  params: any;
  iterableDiffer: any;
  iterableDifferVar: any;
  walletBalance: number = 0;
  shippingDetails: any;
  getGovernId: any
  productData: any = {};
  id: any;
  walletCheck: any;
  payWithWallet: boolean = false;
  localCart: any
  sum: number = 0;
  carts: any[] = [];
  sellerVariations: any = [];
  chechout: any;
  msg: any;
  data: any
  summary: any[] = [];
  isDefault: boolean = false;
  selectedValue: any = 4;
  loadData: boolean = false;
  selectedGovern: any
  checkLang: any
  countries!: any[];
  shipping_fees: any
  purchase:number=0
  checkLogin:number=0
  placeItem:number=0
  constructor(
    private _Router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private iterableDiffers: IterableDiffers,
    private _CheckoutService: CheckoutService,
    private _ProductDetailsService: ProductDetailsService,
    private location: Location,
    private FirebaseService:FirebaseService,
    private datePipe:DatePipe

  ) {
    if(localStorage.getItem('AccessToken')){
      this.checkLogin = 1
    }
    this.getGovernCountryId()
    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')
    this.countries = [
      {
        name: '+2',
        code: 'egypt',
        img: '../../assets/images/egypt.png',
      },
      {
        name: '+966',
        code: 'KSA',
        img: '../../assets/images/download (3).png',
      },
    ];

    this.addressForm = this.fb.group({
      // [ControlKeys.country_id]: ['', [Validators.required]],
      [ControlKeys.city_id]: ['', [Validators.required]],
      [ControlKeys.governorate_id]: ['', [Validators.required]],
      [ControlKeys.address_details]: ['', [Validators.required]],
      [ControlKeys.first_name]: ['', [Validators.required]],
      [ControlKeys.last_name]: ['', [Validators.required]],
      [ControlKeys.phoneCode]: ['', [Validators.required]],
      [ControlKeys.phoneNumber]: ['', [Validators.required]],
      // [ControlKeys.additonalNumber]: [''],
    });
    // Form new address when add new address
    this.newAddressForm = this.fb.group({
      [ControlKeys.city_id]: ['', [Validators.required]],
      [ControlKeys.governorate_id]: ['', [Validators.required]],
      [ControlKeys.address_details]: ['', [Validators.required]],
      [ControlKeys.first_name]: ['', [Validators.required]],
      [ControlKeys.last_name]: ['', [Validators.required]],
      [ControlKeys.phoneCode]: ['', [Validators.required]],
      [ControlKeys.phoneNumber]: ['', [Validators.required]],
      // [ControlKeys.additonalNumber]: [''],
      [ControlKeys.setAddress]: [false],
    });

    this._CheckoutService.geCoutries().subscribe((countries) => {
      this.country = countries.data;
    });
    this.params = new HttpParams();

    setTimeout(() => {
      this.loadData = true
    }, 1500)
    this._ProductDetailsService.productsLength = JSON.parse(localStorage.getItem('Item Data') || '[]');
    this.localCart = JSON.parse(localStorage.getItem('carts') || '');
    this.id = JSON.parse(localStorage.getItem('user') || '')?.data?.id;
    this.walletCheck = JSON.parse(
      localStorage.getItem('user') || ''
    )?.data?.wallet;
    // this.getOrderSummary();
    this.addProductToReview(this._ProductDetailsService.productsLength);
    this.setValuesForAddresess()
    this.getDefaultAddress()

  }
  getDefaultAddress() {
    this._CheckoutService.getAddresses().subscribe((res: any) => {
      this.data = res.data;
      // this.selectedAddresId = this.data.find((x: any) => x.address.is_default_shipping === true).id;
      this.data.forEach((item: any) => {
        if (item.is_default_shipping === true) {
          console.log(">> address", item);

          this.isDefault = true;
          this.selectedAddressId = item.id;
          return item.id;
        }

      });
    });
  }
  setValuesForNewAddresess() {
    let userData = JSON.parse(localStorage.getItem('user') || '{}')

    this.newAddressForm.get(ControlKeys.first_name)?.setValue(userData.first_name);
    this.newAddressForm.get(ControlKeys.last_name)?.setValue(userData.last_name);
    this.newAddressForm
      .get(ControlKeys.phoneCode)
      ?.setValue(
        {
          name: userData.formatted_phone?.code === '+2' ? '+2' : '+966',
          code: userData.formatted_phone?.code === '+2' ? 'egypt' : 'KSA',
          img: userData.formatted_phone?.code === '+2' ? '../../assets/images/egypt.png' : '../../assets/images/download (3).png',
        }
      );


    this.newAddressForm
      .get(ControlKeys.phoneNumber)
      ?.setValue(userData.formatted_phone?.number);
  }
  setValuesForAddresess() {
    let userData = JSON.parse(localStorage.getItem('user') || '{}')

    this.addressForm.get(ControlKeys.first_name)?.setValue(userData.first_name);
    this.addressForm.get(ControlKeys.last_name)?.setValue(userData.last_name);
    this.addressForm
      .get(ControlKeys.phoneCode)
      ?.setValue(
        {
          name: userData.formatted_phone?.code === '+2' ? '+2' : '+966',
          code: userData.formatted_phone?.code === '+2' ? 'egypt' : 'KSA',
          img: userData.formatted_phone?.code === '+2' ? '../../assets/images/egypt.png' : '../../assets/images/download (3).png',
        }
      );


    this.addressForm
      .get(ControlKeys.phoneNumber)
      ?.setValue(userData.formatted_phone?.number);
  }

  getGovernCountryId() {
    if (this.countryId == 1) {
      this.getGovern()
      // this.addressForm.get('phoneCode')?.setValue('+2');
    } else {
      this.getGovern()
      // this.addressForm.get('phoneCode')?.setValue('+966');
    }
  }

  // Get Government in Country by id
  getGovern() {
    this._CheckoutService.geGovern(this.countryId).subscribe((govern) => {
      this.governs = govern.data
      // this.governs = govern.data
    });
    if (this.countryId == 1) {
      // this.addressForm.get('phoneCode')?.setValue('+2');
    } else {
      // this.addressForm.get('phoneCode')?.setValue('+966');
    }
  }
  //
  // Get all Cities in Government by id
  getCities(data: any) {
    this.getGovernId = data.value.id
    this._CheckoutService.geCities(this.getGovernId).subscribe((city) => {
      this.cities = city.data;
    });
  }
  //

  // change content in dailog when add new address
  changeNewAddressMode() {
    this.newAddrssMode = true;
    this.editAddressMode = false;
    this.setValuesForNewAddresess()
    this._CheckoutService.geGovern(this.countryId).subscribe((govern) => {
      this.governs = govern.data;
    });
    this.submitted = false;

  }
  //
  // cancel add new or edit address and change falg check Mode
  cancelNewAddress() {
    this.newAddrssMode = false;
    this.newAddressForm.reset();
    this.editAddressMode = false;
    this.submitted = false;
  }
  //
  // Open dailog when show all address and edit or add or delete
  openChangeAddress() {
    this.changeAddressMode = true;
    this.newAddrssMode = false;
  }
  //
  //
  // add new address when not have any address
  setCustomerAddress() {
    this.submitted = true;
    let obj = {
      country_id: this.countryId,
      first_name: this.addressForm.get(ControlKeys.first_name)?.value,
      last_name: this.addressForm.get(ControlKeys.last_name)?.value,
      phone:
        this.addressForm.get(ControlKeys.phoneCode)?.value.name +
        this.addressForm.get(ControlKeys.phoneNumber)?.value,
      address_details: this.addressForm.get(ControlKeys.address_details)?.value,
      city_id: this.addressForm.get(ControlKeys.city_id)?.value?.id,
      governorate_id: this.addressForm.get(ControlKeys.governorate_id)?.value?.id,
      additonalNumber: '',
      is_default_shipping: true,
    };
    if (this.addressForm.valid) {
      this.submitted = false;
      this._CheckoutService.setCustomerAddress(obj).subscribe((res) => {
        this.data.push(res.data);
        this.addressId = res.data.id;
        this.selectedAddressId = res.data.id;
        this.isDefault = true;
      });
    } else {
      this.submitted = true;
    }
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
          this.newAddressForm.get(ControlKeys.phoneCode)?.value.name +
          this.newAddressForm.get(ControlKeys.phoneNumber)?.value,
        governorate_id: this.newAddressForm.get(ControlKeys.governorate_id)
          ?.value?.id,
        address_details: this.newAddressForm.get(ControlKeys.address_details)
          ?.value,
        city_id: this.newAddressForm.get(ControlKeys.city_id)?.value?.id,
        is_default_shipping:
          this.newAddressForm.get(ControlKeys.setAddress)?.value,

      };

      if (this.newAddressForm.valid) {
        this.submitted = false;
        this._CheckoutService
          .updatCustomerAddress(this.addressId, obj)
          .subscribe((res) => {
            this.data[this.customerDetailsIndex] = res.data;
            this._CheckoutService
              .getAddresses()
              .subscribe((Details: any) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Updated Address Information',
                  detail: 'Your new Address is saved successfully',
                });
                Details.data.map((address: any) => {
                  if (address.is_default_shipping == 1) {
                    this.selectedAddressId = address.id;
                  }

                  this.data = Details.data;
                });
              });
            this.addressId = res.data.id;
            this.newAddressForm.reset();
            this.newAddrssMode = false;
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
          this.newAddressForm.get(ControlKeys.phoneCode)?.value.name +
          this.newAddressForm.get(ControlKeys.phoneNumber)?.value,
        governorate_id: this.newAddressForm.get(ControlKeys.governorate_id)
          ?.value?.id,
        city_id: this.newAddressForm.get(ControlKeys.city_id)?.value?.id,

        is_default_shipping:
          this.newAddressForm.get(ControlKeys.setAddress)?.value,
        address_details: this.newAddressForm.get(ControlKeys.address_details)
          ?.value,
      };
      if (this.newAddressForm.valid) {
        this.submitted = false;

        this._CheckoutService.setCustomerAddress(obj).subscribe((res) => {
          if (res.data.is_default_shipping == 1) {
            this.selectedAddressId = res.data.id;
          }

          this.data.push(res.data);
          this.addressId = res.data.id;
          this._CheckoutService
            .getAddresses()
            .subscribe((Details: any) => {
              Details.data.map((address: any) => {
                if (address.is_default_shipping == 1) {
                  this.selectedAddressId = address.id;
                }
              });
              this.data = Details.data;
            });
          this.newAddressForm.reset();
          this.newAddrssMode = false;
        });
      } else {
        this.submitted = true;
      }
    }
  }
  // set value in form new address
  cityID: number = 0
  handleEditAddressCustomer(data: any, index: number) {
    this.submitted = false;
    this.addressId = data.id;
    this.customerDetailsIndex = index;

    this.newAddrssMode = true;
    this.editAddressMode = true;

    this.cityID = data.city.id
    if (this.editAddressMode == true) {
      this.newAddressForm
        .get(ControlKeys.governorate_id)
        ?.setValue({
          country_id: data.governorate.country_id,
          created_at: data.governorate.created_at,
          id: data.governorate.id,
          name: data.governorate.name

        });
      this._CheckoutService.geCities(data.governorate.id).subscribe((city) => {
        this.cities = city.data;
        city.data.forEach((cityData: any) => {
          console.log(city.data, cityData);
          this.newAddressForm.get(ControlKeys.city_id)?.setValue({
            governorate_id: data.governorate.id,
            created_at: cityData.created_at,
            id: cityData.id,
            name: cityData.name
          });
        })
      });
      this.newAddressForm.get(ControlKeys.first_name)?.setValue(data.first_name);
      this.newAddressForm.get(ControlKeys.last_name)?.setValue(data.last_name);
      this.newAddressForm
        .get(ControlKeys.phoneCode)
        ?.setValue({
          name: data.formatted_phone?.code === '+2' ? '+2' : '+966',
          code: data.formatted_phone?.code === '+2' ? 'egypt' : 'KSA',
          img: data.formatted_phone?.code === '+2' ? '../../assets/images/egypt.png' : '../../assets/images/download (3).png',
        }
        );
      this.newAddressForm
        .get(ControlKeys.phoneNumber)
        ?.setValue(data.formatted_phone?.number);
      this.newAddressForm
        .get(ControlKeys.setAddress)
        ?.setValue(data.is_default_shipping == 1 ? true : false);
      this.newAddressForm
        .get(ControlKeys.address_details)
        ?.setValue(data.address_details);
    }
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
          this._CheckoutService
            .getAddresses()
            .subscribe((Details: any) => {
              this.data = Details.data;
              if (Details.data.length > 0) {
                this.data = Details.data;

              }
              else {
                this.changeAddressMode = false
                this.addressForm.reset()
                this.isDefault = false
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

  // get order summary
  getOrderSummary() {
    this.chechout = {
      address_id: this.selectedAddressId,
      payment_method_id: this.selectedValue,
      purchase_point: 2,
      use_credit: this.payWithWallet,
      seller_variations: this.sellerVariations,
    };
    this.sum = 0;
    this._CheckoutService
      .sendOrderDetails(this.chechout)
      .subscribe((res: any) => {
        console.log('Detaaaaails', res);
        this.shipping_fees = res?.data?.shipping_fees
        this.summary = res.data;
        this.sum = res.data.total;
      });
  }

  // get select products
  addProductToReview(cartData: any) {
    for (let i = 0; i < cartData.length; i++) {
      this.params = this.params.set(`variations[${i}][id]`, cartData[i].id);
      this.params = this.params.set(
        `variations[${i}][quantity]`,
        cartData[i].qty
      );
    }
    this._ProductDetailsService
      .gitProductCart(this.params)
      .subscribe((res: any) => {
        // console.log('detaaaaails',cartData);

        this.selectedProducts = res.data;
        this.sum = 0;
        this.selectedProducts.forEach((cartData: any) => {
          this.sum =
            this.sum + cartData.quantity * cartData.sellerVariation.price;
          this.sellerVariations.push({
            id: cartData.sellerVariation.id,
            quantity: Number(cartData.quantity),
          });
        });
        this.getOrderSummary()
      });
  }

  // check if the credit true or false
  checkCredit(check: any) {
    this.checkCredits = this.checkCredits ? 1 : 0;
  }

  // Remove product from Review
  RemoveProduct(index: any) {
    this.selectedProducts.splice(index, 1);
    this.sellerVariations.splice(index, 1);
    if (this.selectedProducts.length > 0) {

      this.getOrderSummary();
    }
  }

  // send order and finsh choose products
  //  placeOrder() {
  //   let data = this.selectedProducts.map((ele: any) => {
  //     return {
  //       id: ele.id,
  //       quantity: ele.quantity,
  //     };
  //   });
  //   let obj = {
  //     address_id: this.selectedAddressId,
  //     payment_method_id: this.paymentId,
  //     use_credit: this.checkCredits ? 1 : 0,
  //     seller_variations: data,
  //   };


  //   this.confirmationService.confirm({
  //     message: 'do you want to place Order ? ',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this._CheckoutService.placeOrder(obj).subscribe((data: any) => {
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Success',
  //           detail: 'The order has already been followed',
  //         });
  //         this.params = this.params.set('page', 1);
  //         this.params = this.params.set('per_page', 5);
  //         this.placeOrderLoading=true
  //         this._CheckoutService.getListOrders(this.params).subscribe((res) => {
  //           console.log('place order is >>', res);
  //           this.placeOrderLoading=false
  //         });
  //         setTimeout(() => {

  //           this._Router.navigate(['Dashboard/order'])
  //         }, 1500);
  //       });
  //     },
  //     reject: () => {
  //       this.placeOrderLoading=false
  //       this.msgs = [
  //         {
  //           severity: 'info',
  //           summary: 'Rejected',
  //           detail: 'You have rejected',
  //         },
  //       ];
  //     },
  //   });
  // }
  //
  productView:any
  setRealTimeData() {
    this.FirebaseService.userObject = {
      addToCart: '1',
      checkOut: '1',
      online: 1,
      platformType: 'WEB_DESKTOP', // should be enum model
      productView: "1",
      purchase: this.placeItem,
      updatedDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      userId: localStorage.getItem('uniqueId'),
      userIsLogin: this.checkLogin,
    }
    this.FirebaseService.setUSerData(this.FirebaseService.userObject)
  }

  placeOrder() {
    this.placeItem = 1
    this.setRealTimeData()
    this.chechout = {
      address_id: this.selectedAddressId,
      payment_method_id: this.selectedValue,
      purchase_point: 2,
      use_credit: this.payWithWallet,
      seller_variations: this.sellerVariations,
    };
    this._CheckoutService.placeOrder(this.chechout).subscribe((res: any) => {
      this.purchase = 1
      if (
        this.chechout.payment_method_id == 4 ||
        this.chechout.payment_method_id == 3
      ) {
        const url = res.data.transactions[0].paymob_iframe;
        window.open(url, "_self");
      } else {
        // this.msg = res.data.status.name;
        this._Router.navigateByUrl('/success')
      }
      localStorage.removeItem('Item Data')
    });
    // localStorage.removeItem("Item Data");
    // localStorage.removeItem("carts");
  }

  back() {

    this._Router.navigateByUrl('/View-Cart');
  }
  // get payment id
  getPaymentId() {
    this.getOrderSummary();
  }
  //
  // get payment methods
  getPaymentMethods() {
    // paymentMethods
    this._CheckoutService.getPayment().subscribe((res) => {
      this.paymentMethods = res.data.map((pay: any) => {
        return {
          id: pay.id,
          name: pay.name,
          key: pay.key,
        };
      });
    });
  }
  ngOnInit(): void {
    // get all payment methods
    this.getPaymentMethods();
  }
  // backHome(){

  // }

}
