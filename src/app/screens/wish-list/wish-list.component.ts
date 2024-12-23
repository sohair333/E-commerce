import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishListService } from 'src/app/Services/wishList.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  productWishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]');
  params = new HttpParams();
  products: any[] = []
  checkLang: any;
  show: boolean = false;
  empty:boolean = false;

  constructor(private wishServices: WishListService, private _Router: Router) {
    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');

    // this.params=new HttpParams()
    if (this.productWishList.length !== 0) {
      this.getProductWishList();
    }
  }

  getProductWishList() {
    this.show = true
    this.productWishList.map((product: any, index: number) => {
      this.params = this.params.set(`product_ids[${index}]`, product.id);
    });
    this.wishServices.getProducts(this.params).subscribe((res) => {
      console.log(res.data.length);

      if(res.data.length == 0){
        this.empty = false;
      }
      else{
        this.empty= true;
      }

      this.show = false;
      this.products = res.data
      this.products.forEach((product: any, index: number) => {
        product.flag = true;
      });
    });
  }

  addToWishList(product: any) {
    product.flag = !product.flag;
    //   if (product.flag) {
    //   this.productWishList.push(product);
    //   // insert  array to local storage
    //   localStorage.setItem('wishList', JSON.stringify(this.productWishList));
    // }
    if (product.flag == false) {
      for (let i = 0; i < this.productWishList.length; ++i) {
        if (this.productWishList[i].id === product.id) {
          this.productWishList.splice(i, 1);
          // insert updated array to local storage
          this.products = this.products.filter(p => p.id !== product.id)
          localStorage.setItem('wishList', JSON.stringify(this.productWishList));
          // this.products.splice(index, 1)
        }
      }
    }
  }

  back() {
    this._Router.navigate(['/homePage'])
  }
  toHomePage() {
    this._Router.navigateByUrl('')
  }
  ngOnInit(): void { }
}
