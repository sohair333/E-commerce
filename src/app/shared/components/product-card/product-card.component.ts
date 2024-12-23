import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  currency: any;
  @Input() item: any;
  wishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]');
  @Input() brandLogo: string = '';
  @Output() wishListed = new EventEmitter();
  @Output() wishListedData = new EventEmitter();
  showFlashOffer: boolean = false;
  offerPercentage: number = 0;
  xValue: string = '';
  yValue: string = '';
  isYvalueFree: boolean = false;
  yDiscountValue: number = 0;
  showXYoffer: boolean = false;
  checkLogin:number=0
  productView:number=0
  constructor(private FirebaseService:FirebaseService,private datePipe:DatePipe,
    ) {
    if(localStorage.getItem('AccessToken')){
      this.checkLogin = 1
    }
    this.currency = localStorage.getItem('Country') === 'Egypt' ? true : false;
  }

  ngOnInit(): void {
    if (this.item.flash_offer !== null) {
      this.offerPercentage = Math.round(
        this.item.flash_offer.flash_offer_discount
      );
      this.showFlashOffer = true;
    } else if (this.item.flash_offer === null) {
      if (this.item.discounted_price) {
        this.showFlashOffer = true;
        this.offerPercentage = Math.round(
          ((this.item.min_price - this.item.discounted_price) /
            this.item.min_price) *
            100
        );
      }
    }
    if (this.item.buy_x_get_y !== null) {
      this.showXYoffer = true;
      if (this.item.buy_x_get_y.buy_x_get_y.y_discount === null) {
        this.isYvalueFree = true;
        this.xValue = this.item.buy_x_get_y.buy_x_get_y.x_value;
        this.yValue = this.item.buy_x_get_y.buy_x_get_y.y_value;
      } else {
        this.yDiscountValue = this.item.buy_x_get_y.buy_x_get_y.y_discount;
        this.xValue = this.item.buy_x_get_y.buy_x_get_y.x_value;
        this.yValue = this.item.buy_x_get_y.buy_x_get_y.y_value;
        this.isYvalueFree = false;
      }
    }
  }

  clickEvent(product: any) {
    this.wishListed.emit(product);
    // this.productView = 1
    // this.setRealTimeData()
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
      userIsLogin: this.checkLogin,
    }
    this.FirebaseService.setUSerData(this.FirebaseService.userObject)
  }
}
