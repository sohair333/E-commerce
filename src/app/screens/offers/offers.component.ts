import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ProductListService } from 'src/app/Services/product-list.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  data: any[] = [];
  id: any;
  curentLength: number = 5;
  loading: boolean = true;
  typeParams: any;
  searchParams = new HttpParams();
  wishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]');
  checkLang: any;
  checkCountry: any;
  show: boolean = false;
  placeOrderLoading: boolean = false;
  emptyData: boolean = false;
  pageNumber: number = 1;
  isFullDisplayed: boolean = false;
  totlaItems: number = 0;
  filterPromtions:any[]=[]
  ids:any
  paramFilter:any='all'
  constructor(
    private route: ActivatedRoute,
    private _productListService: ProductListService,
    private _router: Router
  ) {
    this.showLoader();
    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
    this.checkCountry = localStorage.getItem('Country');
    this.id = this.route.snapshot.paramMap.get('id');
    this.typeParams = new HttpParams();
    this.getProducts();
  }

  getProducts() {
    this.show = true;
    this.typeParams = this.typeParams.set('promotion_id', this.paramFilter);
    this.typeParams = this.typeParams.set('per_page', 5);
    this.typeParams = this.typeParams.set('page', this.pageNumber);
    this._productListService
      .gitOffers(this.typeParams)
      .pipe(
        finalize(() => {
          this.placeOrderLoading = false;
        })
      )
      .subscribe((res: any) => {
        this.filterPromtions = res.promotions
        console.log(this.filterPromtions);

        this.show = false;
        res.data.map((product: any) => {
          let found: boolean = false;
          this.wishList.map((wish: any) => {
            if (product.id === wish.id) {
              found = true;
            }
          });
          this.data.push({
            ...product,
            flag: found,
          });
        });
        this.totlaItems = res.meta.total;
        if (res.data.length !== 0) {
          this.emptyData = false;
        } else {
          this.emptyData = true;
        }
      });
  }
  onScroll() {
    if (this.data.length !== this.totlaItems) {
      this.pageNumber = 1 + this.pageNumber;
      this.getProducts();
    }
  }
  sortType:string=''
  sortItems(){
    this.show = true;
    if (!this.sortType || this.sortType === 'desc') {
      this.sortType = 'asc';
    } else {
      this.sortType = 'desc';
    }
      if(this.sortType === 'asc'){
        this.data.sort((a:any,b:any)=>{
          return  parseFloat(a.min_price) - parseFloat(b.min_price)
          })
      }
      else{
        this.data.sort((a:any,b:any)=>{
          return  parseFloat(b.min_price) - parseFloat(a.min_price)
          })
      }

      this.show = false;
      if (this.data.length !== 0) {
        this.emptyData = false;
      } else {
        this.emptyData = true;
      }

  }
  filterItems(id:any){
    this.data = []
    this.show = true;
    this.paramFilter =id;
    this.typeParams = this.typeParams.set('promotion_id', this.paramFilter);
    this.typeParams = this.typeParams.set('per_page', 5);
    this.typeParams = this.typeParams.set('page', 1);
    this._productListService
      .gitOffers(this.typeParams)
      .pipe(
        finalize(() => {
          this.placeOrderLoading = false;
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        this.show = false;
        res.data.map((product: any) => {
          let found: boolean = false;
          this.wishList.map((wish: any) => {
            if (product.id === wish.id) {
              found = true;
            }
          });
          this.data.push({
            ...product,
            flag: found,
          });
        });
        this.totlaItems = res.meta.total;
        if (res.data.length !== 0) {
          this.emptyData = false;
        } else {
          this.emptyData = true;
        }
      });
  }
  showLoader() {
    setTimeout(() => {
      this.placeOrderLoading = true;
    }, 100);
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
          // insert updated array to local storage
          localStorage.setItem('wishList', JSON.stringify(this.wishList));
        }
      }
    }
  }
  // naviagteToDetails(){
  //   this._router.navigate(['/product-details'])
  // }
  clickEvent(product: any, index: number) {
    this.data[index].flag = !this.data[index].flag;
    if (product.flag) {
      this.wishList.push(product);
      // insert  array to local storage
      localStorage.setItem('wishList', JSON.stringify(this.wishList));
    } else {
      for (let i = 0; i < this.wishList.length; ++i) {
        if (this.wishList[i].id === product.id) {
          this.wishList.splice(i, 1);
          // insert updated array to local storage
          localStorage.setItem('wishList', JSON.stringify(this.wishList));
        }
      }
    }
  }

  productName: string = '';
  SearchProduct(value: any) {
    this.curentLength = 5;

    this.productName = value.value;
    this.searchParams = this.searchParams.set('search_key', this.productName);
    this.searchParams = this.searchParams.set('category_id', 1);

    setTimeout(() => {
      this._productListService
        .searchProduct(this.searchParams)
        .subscribe((res: any) => {
          this.data = res.data;
        });
    }, 500);
  }
  ngOnInit(): void {}

  back() {
    this._router.navigate(['/homePage']);
  }
}
