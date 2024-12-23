import { ViewportScroller } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CashingService } from 'src/app/Services/cashing.service';
import { ProductDetailsService } from 'src/app/Services/product-details.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Input() productsCart: any[] = []
  @Input() sum: any
  @Input() itemsNumber: any
  productData: any[] = [];
  params: any;
  carts: any[] = [];
  flagDropdown: boolean = false;
  display: boolean = true;
  quantity: number = 0
  checkLang:any
  constructor(
    public _ProductDetailsService: ProductDetailsService,
    private router: Router,
    private _CashingService: CashingService,
    private scroller: ViewportScroller
  ) {
    this.checkLang=localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')
    this.params = new HttpParams();
    this._ProductDetailsService.productsLength = JSON.parse(localStorage.getItem('Item Data') || '[]');
    this._ProductDetailsService.productsLength.forEach((value:any) => {
    this.quantity = this.quantity + value.qty
    })
  }
  routeToCart() {
    this.router.navigate(['/View-Cart']);
  }
  closeSidbar()
  {
    this._ProductDetailsService.sidebarToggle=false
    this.scroller.scrollToAnchor("swiper");
  }
  ngOnInit(): void {
  }
}
