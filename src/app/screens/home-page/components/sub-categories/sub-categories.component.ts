import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

  @Input() sub_categories: any[] = []
  language:any

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;



  constructor(private router: Router) {
    this.language = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')

  }

  navigateToproductList(value: any) {
    this.router.navigate(['all-products/', { id: value, title: 'CATEGORY' }]);
  }
  slideNext() {
    this.swiper?.swiperRef.slideNext(100);
  }
  slidePrev() {
    this.swiper?.swiperRef.slidePrev(100);
  }
  ngOnInit(): void {
  }

}
