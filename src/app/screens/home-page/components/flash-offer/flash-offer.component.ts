import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-flash-offer',
  templateUrl: './flash-offer.component.html',
  styleUrls: ['./flash-offer.component.scss']
})
export class FlashOfferComponent implements OnInit {

  @Input() flashOffer: any;
  @Input() flashOfferData: any;
  wishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]');
  status: boolean = false;
  language:any
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  private subscription!: Subscription;

  public dateNow: any
  public dDay: any
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: number = 0;
  public secondsToDday: number = 0;
  public minutesToDday: number = 0;
  public hoursToDday: number = 0;
  public daysToDday: number = 0;

  constructor() {
    this.language = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')

  }

  ngOnInit(): void {
    this.dateNow = new Date()
    this.dDay = new Date(this.flashOffer.end_date)
    console.log(this.flashOfferData);
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(); });
  }



  slideNext() {
    this.swiper?.swiperRef.slidePrev(100);
  }
  slidePrev() {
    this.swiper?.swiperRef.slideNext(100);
  }

  addToWishList(product: any) {
    product.flag = !product.flag;
    if (product.flag) {
      this.wishList.push(product);
      // insert  array to local storage
      localStorage.setItem('wishList', JSON.stringify(this.wishList));
    } else {
      for (let i = 0; i < this.wishList.length; ++i) {
        if (this.wishList[i].id === product.id) {
          this.wishList.splice(i, 1);
          this.wishList = this.wishList.filter(wish => wish.id === product.id);
          // insert updated array to local storage
          localStorage.setItem('wishList', JSON.stringify(this.wishList));
        }
      }
    }
  }

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

}
