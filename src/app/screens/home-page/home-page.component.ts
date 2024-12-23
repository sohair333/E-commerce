import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/Services/home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  showdetails: boolean = false;
  typeParams: any;
  brandProducts: any;
  data!: any;
  show: boolean = false;
  categories: any[] = [];
  brands: any[] = [];
  brandsProducts: any[] = [];
  id: any;
  brand: any;
  newArrival: any[] = [];
  productsBrands: any[] = [];
  wishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]');
  brandLogo: string = '';
  flashOffer:any
  constructor(private _HomePageService: HomePageService) {
    this.typeParams = new HttpParams();
    this.getAllData();
  }

  ngOnInit(): void {}
  flash:any
  getAllData() {
    this.show = true;
    this.typeParams = this.typeParams.set('banner_type', 3);
    this._HomePageService.get(this?.typeParams).subscribe((res: any) => {
      this.data = res.data;
      this.show = false;
      this.brands = this.data.brands;
      this.id = this.data.brands[0].id;
      this.brandLogo = this.data.brands[0].logo;
      this.getArrivalWishedProducts();
      this.getProductBrandWishedProducts();
      this.flashOffer = res.data.flash_offer
      this.flash = res.data.flash_offer.products;
      this.flashWishList(res.data.flash_offer.products)
      this.categories = this.data.categories.slice(0, 3).map((category: any) => {
        return {
          ...category,
          isHoverd: false,
        };
      });
    });
  }


  flashOfferData:any[]=[]
  flashWishList(flashPeoducts:any){
    this.flashOfferData = flashPeoducts.map((data:any)=>{
        let found:boolean = false
        this.wishList.map((wish)=>{
          if(data.id === wish.id){
            found = true
          }
        });
        return {
          ...data,
          flag:found
        }
    })
  }


  newProducts: any[] = [];
  getArrivalWishedProducts() {
    this.newProducts = this.data.new_products.map((product: any) => {
      let found: boolean = false;
      this.wishList.map((wish: any) => {
        if (product.id === wish.id) {
          found = true;
        }
      });
      return {
        ...product,
        flag: found,
      };
    });
  }

  getProductBrandWishedProducts() {
    this.brandsProducts = this.data.brands[0].products.map((product: any) => {
      let found: boolean = false;
      this.wishList.map((wish: any) => {
        if (product.id === wish.id) {
          found = true;
        }
      });
      return {
        ...product,
        flag: found,
      };
    });
  }
}
