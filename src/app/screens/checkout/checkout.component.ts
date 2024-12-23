import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckoutService } from 'src/app/Services/checkout.service';
import { Router } from '@angular/router';
import { ProductDetailsService } from 'src/app/Services/product-details.service';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  data: any = [];
  payment: any = [];
  productData: any = {};
  id: any;
  walletCheck: any;
  payWithWallet: boolean = false;
  localCart: any = [];
  carts: any[] = [];
  summary: any[] = [];
  cartTotalItems: any = 0;
  sum: number = 0;
  display: boolean = false;
  indexCart: number = 0;
  paymentValue: any;
  selectedAddresId: number | undefined;
  selectedValue: any;
  total: number = 0;
  params: any;
  sellerVariations: any = [];
  chechout: any;
  msg: any;
  checkLang:any

  constructor(
    private _CheckoutService: CheckoutService,
    private _ProductDetailsService: ProductDetailsService,
    private _httpClient: HttpClient,
    private router: Router,
    private location: Location
  ) {
    this.checkLang=localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
    this.params = new HttpParams();
    this._ProductDetailsService.productsLength = JSON.parse(localStorage.getItem('Item Data') || '[]');
    this.localCart = JSON.parse(localStorage.getItem('carts') || '');
    this.id = JSON.parse(localStorage.getItem('user') || '')?.data?.id;
    this.walletCheck = JSON.parse(
      localStorage.getItem('user') || ''
    )?.data?.wallet;
    this.getPayment();
    this.getDefaultAddress();
    this.gitCarts(this._ProductDetailsService.productsLength);
  }

  gitCarts(cartData: any) {
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
        this.carts = res.data;
        this.sum = 0;
        this.carts.forEach((cartData: any) => {
          this.sum =
            this.sum + cartData.quantity * cartData.sellerVariation.price;
          this.sellerVariations.push({
            id: cartData.sellerVariation.id,
            quantity: Number(cartData.quantity),
          });
        });
      });
  }

  ngOnInit(): void { }

  isDefault: boolean = false;
  getDefaultAddress() {
    this._CheckoutService.getAddresses().subscribe((res: any) => {
      this.data = res.data;
      // this.selectedAddresId = this.data.find((x: any) => x.address.is_default_shipping === true).id;
      this.data.forEach((item: any) => {
        if (item.is_default_shipping === true) {
          this.isDefault = true;
          this.selectedAddresId = item.id;
          return item.id;
        }
      });
    });
  }

  addAddress() {
    this.router.navigate(['/checkout/address']);
  }

  sendIndex(index: any) {
    this.display = true;
    this.indexCart = index;
  }

  deleteCart() {
    this.carts.splice(this.indexCart, 1);
    this.display = false;
  }

  getPayment() {
    this._CheckoutService.getPayment().subscribe((res: any) => {
      this.payment = res.data.map((payment: any) => {
        return {
          ...payment,
          isSelected: false,
        };
      });
      this.selectedValue = this.payment[0].id;
    });
  }

  checkPayment() {
    this.chechout = {
      address_id: this.selectedAddresId,
      payment_method_id: this.selectedValue,
      purchase_point: 2,
      use_credit: this.payWithWallet,
      seller_variations: this.sellerVariations,
    };
    this.sum = 0;
    this._CheckoutService
      .sendOrderDetails(this.chechout)
      .subscribe((res: any) => {
        this.summary = res.data;
        this.sum = res.data.total;
      });
  }

  order() {
    this.chechout = {
      address_id: this.selectedAddresId,
      payment_method_id: this.selectedValue,
      purchase_point: 2,
      use_credit: this.payWithWallet,
      seller_variations: this.sellerVariations,
    };
    this._CheckoutService.placeOrder(this.chechout).subscribe((res: any) => {
      if (
        this.chechout.payment_method_id == 4 ||
        this.chechout.payment_method_id == 3
      ) {
        const url = res.data.transactions[0].paymob_iframe;
        window.open(url, "_self")
      } else {
        this.msg = res.data.status.name;
        this.router.navigateByUrl('/success')
      }
      localStorage.removeItem('Item Data')
      this._ProductDetailsService.productsLength = []
    });
    // localStorage.removeItem("Item Data");
    // localStorage.removeItem("carts");
  }

  back() {
    // localStorage.removeItem("Item Data");
    // localStorage.removeItem("carts");
    this.router.navigateByUrl('/View-Cart');
  }
}
