import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/Services/home-page.service';
import { HttpParams } from '@angular/common/http';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper';
import { Router } from '@angular/router';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]);

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any[] = [];
  typeParams: any
  show: boolean = false
  childs: any
  panelOpenState = false;
  brands: any;



  constructor(private _HomePageService: HomePageService, private router: Router) {
    this.typeParams = new HttpParams();
    this.getAllData()
  }
  ngOnInit(): void {
  }

  getAllData() {
    this.show = true
    this.typeParams = this.typeParams.set('banner_type', 1);
    this._HomePageService.get(this?.typeParams).subscribe((res: any) => {
      this.show = false
      this.childs = res.data.categories[0].children
      this.categories = res.data.categories.map((category: any) => {
        return {
          ...category,
          isActive: false
        }
      })

      this.brands = res.data.categories[0].top_brands.map((top_brand: any) => {
        return {
          ...top_brand,
        }
      })
    })
  }

  childsIndex: number = 0;
  getChilds(index: number, childs: any) {
    this.childsIndex = index
    this.childs = childs.children
    this.getBrands(index)
  }

  getBrands(index: number) {
    this._HomePageService.get(this?.typeParams).subscribe((res: any) => {
      this.show = false
      this.brands = res.data.categories[index].top_brands.map((top_brand: any) => {
        return {
          ...top_brand,
        }
      })
    })
  }

  viewbrandProducts(id: number) {
    this.router.navigate(['all-products/', { id: id, title: 'BRAND' }]);
  }
  viewCategoriesProducts(id: number) {
    this.router.navigate(['all-products/', { id: id, title: 'CATEGORY' }]);
  }

}
