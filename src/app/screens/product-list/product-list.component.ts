import { Attribute } from '@angular/compiler';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/Services/product-list.service';
import { ActivatedRoute } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  typeParams: HttpParams;
  data: any = [];
  filter: any = [];
  categories: any = [];
  attributes: any = [];
  brands: any = [];
  collections: any = [];
  selectedSize: any;
  selectedColor: any;
  chickCategoy: boolean = true;
  chickBrand: boolean = true;
  chickPrice: boolean = true;
  chickColor: boolean = true;
  chickSize: boolean = true;
  id: any;
  currentLength: any = 5;
  wishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]');
  status: boolean = false;
  allProducts: any[] = [];
  paramKey: string = '';
  filters: any[] = [];
  rangeValues: number[] = [];
  minValue: any;
  maxValue: any;
  show: boolean = false;
  filtersParams: any;
  value: number = 40;
  highValue: number = 60;
  sortType!: string;
  sortedA_Z: any
  selectedLang: any
  selectedItem: any
  options: Options = {
    floor: this.rangeValues[0] ?? 0,
    ceil: this.rangeValues[1] ?? 100,
  };
  lang: any

  constructor(
    private _ProductListService: ProductListService,
    private route: ActivatedRoute,
    private _productListService: ProductListService
  ) {

    this.selectedLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';

    this.sortedA_Z = [
      { name: 'Heighest To Lowest', value: 1 },
      { name: 'Lowest To Heighest', value: 2 },
    ]
    //this.sortByPrice();
    this.lang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')
    this.filtersParams = new HttpParams();
    this.typeParams = new HttpParams();
    this.id = this.route.snapshot.paramMap.get('id');
    let param = this.route.snapshot.paramMap.get('title');
    this.paramKey =
      param === 'BRAND'
        ? 'brand_id[]'
        : param === 'CATEGORY'
          ? 'category_id[]'
          : 'search_key';
    this.getProducts();
    this.getAllFilters();
    this.filters = [
      {
        name: 'Category',
        value: 1,
      },
      {
        name: 'Brand',
        value: 2,
      },
      {
        name: 'Price',
        value: 3,
      },
    ];
  }

  type: any;
  filterOptions(index: number, Filter: any) {
    this.type = Filter.type;
    this.filters[index].isExpanded = !this.filters[index].isExpanded
    // this.mapFilter()
  }

  brandsFilterData: any[] = [];
  maxPrice: number = 0;
  minPrice: number = 0;
  colors: any[] = [];
  sizes: any;
  attributesdata: any[] = [];
  categoriesData: any[] = [];
  patternData: any[] = [];
  getAllFilters() {
    this._ProductListService.gitFilters().subscribe((filters) => {
      this.attributes = filters.data.attributes.map((filter: any) => {
        return {
          name: filter.title,
          value: filter.id,
          data: filter,
          type: filter.type.name,
          isExpanded: true,
        };
      });
      let basicFilters = [
        {
          name: this.lang === 'en' ? 'Category' : 'فئه',
          value: '1c',
          data: filters.data.categories,
          type: 'CATEGORY',
          isExpanded: true,
        },
        {
          name: this.lang === 'en' ? 'Brand' : 'ماركة',
          value: '2b',
          data: filters.data.brands,
          type: 'BRANDS',
          isExpanded: true,
        },
        {
          name: this.lang === 'en' ? 'Price' : 'السعر',
          value: '3p',
          minPrice: filters.data.min_price,
          maxPrice: filters.data.max_price,
          type: 'PRICE',
          isExpanded: false,
        },
      ];
      this.filters = [...basicFilters, ...this.attributes];
      this.mapFilter();
    });
  }

  mapFilter() {
    this.rangeValues = [this.filters[2].minPrice, this.filters[2].maxPrice];
    this.minValue = Number(this.filters[2].minPrice);
    this.maxValue = Number(this.filters[2].maxPrice);
    this.filters.forEach((data: any) => {
      if (data.type === 'CATEGORY') {
        this.categoriesData = data.data.map((category: any) => {
          return {
            ...category,
            isSelectedCategory: false,
          };
        });
      } else if (data.type === 'BRANDS') {
        this.brandsFilterData = data.data.map((brand: any) => {
          return {
            ...brand,
            isSelectedbrand: false,
          };
        });
      } else if (data.type === 'PRICE') {
        this.value = data.minPrice;
        this.highValue = data.maxPrice;
        this.options = {
          floor: data.minPrice ?? 0,
          ceil: data.maxPrice ?? 100,
        };
      } else if (data.type === 'COLOR_SWATCH') {
        this.colors = data.data.values.map((value: any) => {
          return {
            ...value,
            selectedColor: false,
          };
        });
      } else if (data.type === 'SIZE') {
        // let textSize
        this.sizes = data.data.values.map((value: any) => {
          return {
            ...value,
            selectedSize: false,
          };
        });
      } else if (data.type === 'PATTERN_SWATCH') {
        data.data.values.map((value: any) => {
          this.patternData.push({
            ...value,
            selectedPattern: false,
            type: data.type,
          });
        });
      } else {
        // this.attributesdata = []
        data.data.values.map((value: any) => {
          this.attributesdata.push({
            ...value,
            selectedAttr: false,
            type: data.type,
          });
        });
      }
    });
  }

  // filter with category
  categoryFilters: any[] = [];
  selectCategory(value: any, index: number) {
    if (this.categoriesData[index].isSelectedCategory.length !== 0) {
      this.categoryFilters.push(this.categoriesData[index].id);
    } else {
      this.categoryFilters = this.categoryFilters.filter(
        (id) => id !== this.categoriesData[index].id
      );
    }
  }
  // filter with category

  // filter with Brand
  brandsFilter: any[] = [];
  selectBrand(value: any, index: number) {
    if (this.brandsFilterData[index].isSelectedCategory.length !== 0) {
      this.brandsFilter.push(this.brandsFilterData[index].id);
    } else {
      this.brandsFilter = this.brandsFilter.filter(
        (id) => id != this.brandsFilterData[index].id
      );
    }
  }
  // filter with Brand

  // filter with color attribute
  colrosFilters: any[] = [];
  selectColor(index: number) {
    this.colors[index].selectedColor = !this.colors[index].selectedColor;
    if (this.colors[index].selectedColor) {
      this.colrosFilters.push(this.colors[index].id);
    } else {
      this.colrosFilters = this.colrosFilters.filter(
        (id) => id != this.colors[index].id
      );
    }
  }
  // filter with color attribute

  // filter with pattern attribute
  patternFitlers: any[] = [];
  selectPattern(index: number, data: any) {
    this.patternData[index].selectedPattern =
      !this.patternData[index].selectedPattern;
    if (this.patternData[index].selectedPattern) {
      this.patternFitlers.push(this.patternData[index].id);
    } else {
      this.patternFitlers = this.patternFitlers.filter(
        (id) => id != this.patternData[index].id
      );
    }
  }
  // filter with pattern attribute

  // filter with size attribute
  sizeFilters: any[] = [];
  selectSize(index: any) {
    this.sizes[index].selectedSize = !this.sizes[index].selectedSize;
    if (this.sizes[index].selectedSize) {
      this.sizeFilters.push(this.sizes[index].id);
    } else {
      this.sizeFilters = this.sizeFilters.filter(
        (id) => id != this.sizes[index].id
      );
    }
  }
  // filter with size attribute


  applyFilters() {
    // this.searchParams = this.searchParams.set(this.paramKey, null);
    this.filtersParams = new HttpParams();
    this.show = true;
    // params = params.delete('token')
    if (this.filters[2].isExpanded) {
      this.filtersParams = this.filtersParams.append('price_from[]', this.value);
      this.filtersParams = this.filtersParams.append(
        'price_to[]',
        this.highValue
      );
    }
    this.categoryFilters.forEach((id) => {
      this.filtersParams = this.filtersParams.append('category_id[]', id);
    });
    this.brandsFilter.forEach((id) => {
      this.filtersParams = this.filtersParams.append('brand_id[]', id);
    });
    this.colrosFilters.forEach((id) => {
      this.filtersParams = this.filtersParams.append('attribute_values[]', id);
    });
    this.sizeFilters.forEach((id) => {
      this.filtersParams = this.filtersParams.append('attribute_values[]', id);
    });
    this.patternFitlers.forEach((id) => {
      this.filtersParams = this.filtersParams.append('attribute_values[]', id);
    });
    // this.attributeFilters.forEach(id => {
    //   this.filtersParams = this.filtersParams.append('attribute_values[]', id)
    // })
    this._productListService
      .filter(this.filtersParams)
      .pipe(finalize(() => (this.show = false)))
      .subscribe((res: any) => {
        // this.step = 1
        this.data = res.data.map((product: any) => {
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
        // this.resetValues();
      });
  }
  priceOpen: boolean = false;
  isCollapsed: boolean = true
  toggleFilterExapnd() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.expandAll()
    } else {
      this.collapsAll()
    }
  }
  collapsAll() {
    this.filters.map((filter: any) => {
      filter.isExpanded = false
    })
  }
  expandAll() {
    this.filters.map((filter: any) => {
      filter.isExpanded = true
    })
  }
  sortByPrice(data: any) {
    this.filtersParams = new HttpParams();
    if (data.target.value === 'Z2A') {
      this.sortType = 'asc';
    } else {
      this.sortType = 'desc';
    }
    this.filtersParams = this.filtersParams.append('sort_by', 'price');
    this.filtersParams = this.filtersParams.append('sort_type', this.sortType);
    this._ProductListService.sortProduct(this.filtersParams).subscribe((res: any) => {
      this.data = res.data.map((data: any) => {
        let found: boolean = false;
        this.wishList.map((wish: any) => {
          if (data.id === wish.id) {
            found = true;
          }
        });
        return {
          ...data,
          flag: found,
        };

      })
    })

  }
  resetValues() {
    this.categoryFilters = [];
    this.sizeFilters = [];
    this.colrosFilters = [];
    // this.attributeFilters = []
    this.brandsFilter = [];
    this.patternData = [];
    // this.childs?.forEach((value: any) => {
    //   value.selectedchild = ['false']
    // value.LastChildrens.map((lastChild: any) => {
    //   lastChild.selectedChildren = false
    // })
    // })
    this.brandsFilterData?.forEach((element) => {
      element.isSelectedbrand = false;
    });
    this.colors?.forEach((color) => {
      color.selectedColor = false;
    });
    this.patternFitlers?.forEach((color) => {
      color.selectedPattern = false;
    });
    this.sizes = this.sizes?.map((value: any) => {
      return {
        ...value,
        selectedSize: false,
      };
    });
    // this.selectAllFlag = ['false']
    this.attributes.forEach((value: any) => {
      value.selectedAttr = ['false'];
    });
  }

  Reset() {
    this.resetValues();
    this._productListService.resetAllProducts().subscribe((res: any) => {
      // this.step = 1
      this.data = res.data.map((product: any) => {
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
    });
  }

  getProducts() {
    this.show = true;
    this.typeParams = this.typeParams.set(this.paramKey, this.id);
    this._ProductListService
      .get(this?.typeParams)
      .pipe(
        finalize(() => {
          this.show = false;
        })
      )
      .subscribe((res: any) => {
        this.data = res.data;
        this.getAllProductsWished();
      });
  }

  getAllProductsWished() {
    this.data = this.data.map((product: any) => {
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
  increaseLength() {
    this.currentLength += 5;
  }

  opencategory() {
    this.chickCategoy = !this.chickCategoy;
  }
  openbrand() {
    this.chickBrand = !this.chickBrand;
  }
  openprice() {
    this.chickPrice = !this.chickPrice;
  }
  opencolor() {
    this.chickColor = !this.chickColor;
  }
  opensize() {
    this.chickSize = !this.chickSize;
  }

  // productsFilter() {
  //   this.typeParams = this.typeParams.set(this.paramKey, 4);
  //   this._ProductListService.get(this?.typeParams).subscribe((res: any) => {
  //     this.data = res.data.map((product: any) => {
  //       let found: boolean = false;
  //       this.wishList.map((wish: any) => {
  //         if (product.id === wish.id) {
  //           found = true;
  //         }
  //       });
  //       return {
  //         ...product,
  //         flag: found,
  //       };
  //     });
  //   });
  // }

  ngOnInit(): void { }
}
