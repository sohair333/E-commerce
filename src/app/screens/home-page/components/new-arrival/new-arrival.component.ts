import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.scss'],
})
export class NewArrivalComponent implements OnInit {
  id: any;
  heartToggle: boolean = false;
  wishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]');
  status: boolean = false;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  // id: any
  // heartToggle: boolean = false
  // wishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]')
  @Input() newProducts: any[] = []
  language: any

  constructor() {
    this.language = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')
  }

  slideNext() {
    this.swiper?.swiperRef.slidePrev(100);
  }
  slidePrev() {
    this.swiper?.swiperRef.slideNext(100);
  }

  ngOnInit(): void { }

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
}
