import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]);

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {

  @Input() banners: any[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
