import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageService } from 'src/app/Services/home-page.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-shop-by-brand',
  templateUrl: './shop-by-brand.component.html',
  styleUrls: ['./shop-by-brand.component.scss'],
})

export class ShopByBrandComponent implements OnInit {
  @Input() brands: any[] = [];
  @Input() brandsProducts: any[] = [];
  @Input() id: any;
  @Input() brand: any;
  @Input() brandLogo: string = '';
  wishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]');
  @ViewChild('swipers', { static: false }) swipers?: SwiperComponent;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  status: boolean = false;
  language: string
  constructor(
    private _HomePageService: HomePageService,
    private router: Router
  ) {
    this.language = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || ''
  }

  ngOnInit(): void {
    console.log("brands", this.brands)
  }
  slideNext2() {

    this.swipers?.swiperRef.slidePrev(100);
  }
  slidePrev2() {
    this.swipers?.swiperRef.slideNext(100);
  }

  slideNext() {
    this.swiper?.swiperRef.slidePrev(100);
  }
  slidePrev() {
    this.swiper?.swiperRef.slideNext(100);
  }
  getProducts(data: any) {
    this._HomePageService.getBrands(data.id).subscribe((res: any) => {
      this.brandsProducts = res.data.map((product: any) => {
        let found: boolean = false;
        this.wishList.map((wish: any) => {
          if (product.id === wish.id) {
            found = true;
            console.log(product, wish);
          }
        });
        console.log(found);
        return {
          ...product,
          flag: found,
        };
      });
      // this.brandsProducts = [...res?.data]
      //console.log(res.data);
    });

    this.brandLogo = data.logo;
    this.id = data.id;
  }
  addToWishList(product: any) {
    console.log(product);

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

  seeAll() {
    this.router.navigate(['all-products/', { id: this.id, title: 'BRAND' }]);
  }

}
