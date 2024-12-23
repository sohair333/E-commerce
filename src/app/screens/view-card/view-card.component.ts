import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetailsService } from 'src/app/Services/product-details.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { DatePipe, Location } from '@angular/common';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss'],
})
export class ViewCardComponent implements OnInit {
  params: any;
  carts: any[] = [];
  placeOrderLoading: boolean = false;
  checkLang: any;
  wishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]');
  checkLogin:number = 0
  purchase:number = 0
  constructor(
    private router: Router,
    public _ProductDetailsService: ProductDetailsService,
    private FirebaseService:FirebaseService,
    private datePipe:DatePipe

  ) {
    if(localStorage.getItem('AccessToken')){
      this.checkLogin = 1
    }
    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
    this.params = new HttpParams();
    this._ProductDetailsService.sidebarToggle = false;

    this._ProductDetailsService.productsLength = JSON.parse(
      localStorage.getItem('Item Data') || '[]'
    );
    if (this._ProductDetailsService.productsLength.length !== 0) {
      this.gitCarts(this._ProductDetailsService.productsLength);
    }
  }

  backToOrder() {
    console.log('back');
  }
  clickEvent(product: any, index: number) {
    product.flag = !product.flag;
    if (product.flag) {
      let productWished = {
        ...product,
        id: product.product_id,
      };
      this.wishList.push(productWished);
      // insert  array to local storage
      localStorage.setItem('wishList', JSON.stringify(this.wishList));
    } else {
      for (let i = 0; i < this.wishList.length; ++i) {
        if (this.wishList[i].id === product.product_id) {
          this.wishList.splice(i, 1);
          // insert updated array to local storage
          localStorage.setItem('wishList', JSON.stringify(this.wishList));
        }
      }
    }
  }

  // plus Quantity Product
  PlusQuantityProduct(index: number) {
    this._ProductDetailsService.productsLength[index].quantity++;
  }
  //
  // minus Quantity Product
  minusQuantityProduct(product: any, index: number) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  // Remove product from Review
  RemoveProduct(index: any) {
    this._ProductDetailsService.productsLength.splice(index, 1);
  }

  placeOrder() {
    console.log('place');
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
        this.carts = res.data.map((item: { id: any }) => {
          let found: boolean = false;
          this.wishList.map((wishListItem: any) => {
            if (wishListItem.id === item.id) {
              found = true;
            }
          });
          return {
            ...item,
            flag: found,
          };
        });
        this.sum = 0;
        this.carts.forEach((cartData: any) => {
          this.sum =
            this.sum + cartData.quantity * cartData.sellerVariation.price;
        });
      });
  }

  sum: number = 0;
  changeQty(data: any) {
    let quantity = 0;
    this._ProductDetailsService.productsLength.forEach((productData: any) => {
      if (productData.id === data?.seller_variation_id) {
        productData.qty = quantity + data.quantity;
      }
    });
    this.gitCarts(this._ProductDetailsService.productsLength);
  }

  back() {
    this.router.navigateByUrl('/homePage');
  }

  login: boolean = false;
  checkout() {

    if (localStorage.getItem('AccessToken')) {
      this.router.navigateByUrl('/checkout');
      localStorage.setItem('carts', JSON.stringify(this.carts));
    } else {
      this.login = true;
    }
  }

  checkoutWeb() {
    this.purchase = 1
    this.setRealTimeData()
    if (localStorage.getItem('AccessToken')) {
      this.router.navigateByUrl('/checkout');
      localStorage.setItem('carts', JSON.stringify(this.carts));
    } else {
      this.openDialoglogin();
    }
  }
  productView:any
  setRealTimeData() {
    this.FirebaseService.userObject = {
      addToCart: '1',
      checkOut: '0',
      online: 1,
      platformType: 'WEB_DESKTOP', // should be enum model
      productView: "0",
      purchase: "0",
      updatedDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      userId: localStorage.getItem('uniqueId'),
      userIsLogin: this.checkLogin,
    }
    this.FirebaseService.setUSerData(this.FirebaseService.userObject)
  }
  checkoutConfirm() {
    this.router.navigateByUrl('/auth');
  }

  toHomePage() {
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {

  }

  display: boolean = false;
  indexCart: number = 0;
  cartID: number = 0;
  sendIndex(index: any, productData: any) {
    this.display = true;
    this.cartID = productData.seller_variation_id;
    this.indexCart = index;
  }

  deleteCart() {
    this.carts.splice(this.indexCart, 1);
    this._ProductDetailsService.productsLength =
      this._ProductDetailsService.productsLength.filter(
        (card: any) => card.id !== this.cartID
      );
    localStorage.setItem(
      'Item Data',
      JSON.stringify(this._ProductDetailsService.productsLength)
    );
    this.gitCarts(this._ProductDetailsService.productsLength);
    this.display = false;
  }

  cancel() {
    this.display = false;
    this.login = false;
  }

  dialogToggle: any;
  tabName: any;
  changeDialogToggle(value: any) {
    this.dialogToggle = value;
  }

  openDialogCreateAccount() {
    // this.dialog.open(CreateAccountPopupComponent);
    this.tabName = 'register';
    this.dialogToggle = true;
    console.log('register');
  }
  openDialoglogin() {
    this.tabName = 'login';
    this.dialogToggle = true;
    console.log('login');
    // this.dialog.open(LoginPopupComponent);
  }
  tabNameChilds(value: any) {
    this.tabName = value;
  }

}
