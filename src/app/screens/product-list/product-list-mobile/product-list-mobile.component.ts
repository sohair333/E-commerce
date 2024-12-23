import { HttpParams } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ProductListService } from 'src/app/Services/product-list.service';
import { Location } from '@angular/common';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-product-list-mobile',
  templateUrl: './product-list-mobile.component.html',
  styleUrls: ['./product-list-mobile.component.scss'],
})
export class ProductListMobileComponent implements OnInit {
  //@Input() id!: number;
  //@Input() paramKey!: string;
  id: any;
  data: any[] = [];
  brands!: any;
  searchParams: any;
  newArrival:any;
  brandParams: any;
  sortType!: string;
  step: number = 0;
  brandLogos: any;
  brandsTitle: any;
  clientBrands: any;
  isSelected: boolean = false;
  curentLength: number = 5;
  typeParams = new HttpParams();
  promotion: boolean = true;
  wishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]');
  status: boolean = false;
  allProducts: any[] = [];
  timer: any;
  paramKey: string = '';
  param: any
  loading: boolean = true;
  selectedFilter: any
  type: string = ''
  filterData: any[] = []
  childs: any
  selectedCategory: any
  childsIndex: any
  panelOpenState = false;
  selectedParentCategory: any
  checkboxDisabled: boolean = false
  LastChildrens: any
  filtersParams: any
  rangeValues: number[] = [];
  @Input() show: boolean = false;
  @Input() filters: any[] = []
  checkLang: any
  isOpen: boolean = false
  value: number = 0;
  highValue: number = 0;
  options: any

  constructor(
    private _router: Router,
    private _productListService: ProductListService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')
    this.step = 1;
    this.selectedFilter = '1c'
    this.id = this.route.snapshot.paramMap.get('id');
    let param = this.route.snapshot.paramMap.get('title');
    this.paramKey = param === 'BRAND' ? 'brand_id[]' : param === 'CATEGORY' ? 'category_id[]' : 'search_key';
    this.getProducts();
    this.searchParams = new HttpParams();
    this.brandParams = new HttpParams();
    this.newArrival = new HttpParams();
    this.filtersParams = new HttpParams();
    this.getbrandProducts();

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
          // insert updated array to local storage
          localStorage.setItem('wishList', JSON.stringify(this.wishList));
        }
      }
    }
  }

  FilterData(value: any) {
    this.step = 2;
  }

  BackHome(event: any) {
    this._router.navigate(['/homePage']);
  }
  getProducts() {
    this.show = true
    this.typeParams = this.typeParams.set(this.paramKey, this.id);
    this._productListService.get(this?.typeParams).subscribe((res: any) => {
      this.allProducts = res.data.map((product: any) => {
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
      this.show = false;
      // this.getAllProductsWished();
    });
  }

  getAllProductsWished() {
    this.allProducts = this.data.map((product: any) => {
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

  productName: string = '';
  handleSearchValue(value: any) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.productName = value.target.value;
      this.searchParams = this.searchParams.set('search_key', this.productName);
      this.searchParams = this.searchParams.set('sort_by', 'price');
      this.searchParams = this.searchParams.set(this.paramKey, this.id);
      this.searchParams = this.searchParams.set('sort_type', this.sortType);
      this._productListService
        .searchProduct(this.searchParams)
        .subscribe((res: any) => {
          this.allProducts = res.data.map((product: any) => {
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
    }, 500);
  }

  getbrandProducts() {
    this._productListService.getbrands().subscribe((res: any) => {
      this.brands = res.data;
    });
  }

  sortByBrands(value: any) {
    this.curentLength = 5;
    const target = value.target as HTMLInputElement;
    this.brandParams = this.brandParams.set('brand_id', target.id);
    this.brandParams = this.brandParams.set(this.paramKey, this.id);
    this._productListService
      .brandsProduct(this.brandParams, target.id)
      .subscribe((res: any) => {
        this.allProducts = res.data.map((product: any) => {
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

  sortProducts(value: any) {
    if (!this.sortType || this.sortType === 'desc') {
      this.sortType = 'asc';
    } else {
      this.sortType = 'desc';
    }
    if (this.productName) {
      this.searchParams = this.searchParams.set('search_key', this.productName);
    }
    this.searchParams = this.searchParams.set('sort_by', 'price');
    this.searchParams = this.searchParams.set(this.paramKey, this.id);
    this.searchParams = this.searchParams.set('sort_type', this.sortType);
    this._productListService
      .sortProduct(this.searchParams)
      .subscribe((res: any) => {
        this.allProducts = res.data.map((product: any) => {
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

  // start Filters
  brandsFilterData: any[] = []
  maxPrice: number = 0
  minPrice: number = 0
  colors: any[] = []
  sizes: any
  attributes: any[] = []
  fitlerType(data: any) {
    this.filterData = []
    this.step = 3;
    this.selectedFilter = data.value;
    this.type = data.type
    if (data.type === 'CATEGORY') {
      this.filterData = data.data.map((category: any) => {
        return {
          ...category,
          isSelectedCategory: false
        }
      }
      )
    } else if (data.type === 'BRANDS') {
      this.brandsFilterData = data.data.map((brand: any) => {
        return {
          ...brand,
          isSelectedbrand: false
        }
      })
    } else if (data.type === 'PRICE') {
      this.maxPrice = data.maxPrice
      this.minPrice = data.minPrice
      this.rangeValues = [data.minPrice, data.maxPrice]
      this.value = data.minPrice;
      this.highValue = data.maxPrice;
      this.options = {
        floor: data.minPrice ?? 0,
        ceil: data.maxPrice ?? 100
      };
    } else if (data.type === 'COLOR_SWATCH') {
      this.colors = data.data.values.map((value: any) => {
        return {
          ...value,
          selectedColor: false
        }
      })
    } else if (data.type === 'SIZE') {
      // let textSize
      this.sizes = data.data.values.map((value: any) => {
        return {
          ...value,
          selectedSize: false
        }
      })
    } else {
      this.attributes = data.data.values.map((value: any) => {
        return {
          ...value,
          selectedAttr: false
        }
      })
    }
  }

  filterOptions(Filter: any) {
    this.selectedFilter = Filter.value;
    this.type = Filter.type
    if (Filter.type === 'CATEGORY') {
      this.filterData = Filter.data.map((category: any) => {
        return {
          ...category,
          isSelectedCategory: false
        }
      }
      )
    } else if (Filter.type === 'BRANDS') {
      this.brandsFilterData = Filter.data.map((brand: any) => {
        return {
          ...brand,
          isSelectedbrand: false
        }
      })
    } else if (Filter.type === 'PRICE') {
      this.maxPrice = Filter.maxPrice
      this.minPrice = Filter.minPrice
      this.rangeValues = [Filter.minPrice, Filter.maxPrice]
    } else if (Filter.type === 'COLOR_SWATCH') {
      this.colors = Filter.data.values.map((value: any) => {
        return {
          ...value,
          selectedColor: false
        }
      })
    }
    else if (Filter.type === 'SIZE') {
      this.sizes = Filter.data.values.map((value: any) => {
        return {
          ...value,
          selectedSize: false
        }
      })
    } else {
      this.attributes = Filter.data.values.map((value: any) => {
        return {
          ...value,
          selectedAttr: false
        }
      })
    }
  }

  NewArrival(data:any):void{
    if (!this.sortType || this.sortType === 'desc') {
      this.sortType = 'asc';
    } else {
      this.sortType = 'desc';
    }
    this.newArrival = this.newArrival.set('sort_type', this.sortType);
    this.newArrival = this.newArrival.set('sort_by', 'created_at');
    this._productListService.newArrival(this.newArrival).subscribe((res:any)=>{
      console.log(res);

      this.allProducts = res.data.map((prod:any)=>{
        console.log(this.allProducts);

        let found = false;
        this.wishList.map((wish:any)=>{
          if(prod.id === wish.id){
            found = true;
          }
        });
        return {
          ...prod,
          flag:found
        }

      })
    })


  }
  // start filtering with the category
  isExpanded: boolean = true
  childrenIDs: any[] = []
  parentID: number = 0
  selected: boolean = false
  categoryFilters: any[] = []

  getChilds(index: number, childs: any) {
    this.childs = childs.children.map((child: any) => {
      this.isExpanded = child.children.length === 0 ? true : false
      return {
        ...child,
        selectedchild: false,
        checkboxDisabled: child.children.length === 0 ? true : false,
        LastChildrens: child.children.map((children: any) => {
          return {
            ...children,
            selectedChildren: false
          }
        })
      }
    })
    this.selectedCategory = true
    this.childsIndex = index
  }

  SelectAll(childs: any, index: number) {
    this.selected = !this.selected
    if (childs.selectedchild.length !== 0) {
      this.parentID = childs.id
      this.childs[index].LastChildrens.map((lastChild: any) => {
        lastChild.selectedChildren = true
        this.childrenIDs.push(lastChild.id)
      })
      this.categoryFilters = this.childrenIDs
    } else {
      this.childs[index].LastChildrens.map((lastChild: any) => {
        lastChild.selectedChildren = false
      })
      this.childrenIDs = []
      this.categoryFilters = this.childrenIDs
    }
  }


  selectCategory(secondChildIndex: number, firstChildIndex: number) {
    let firstChildren = this.childs[firstChildIndex]
    let secondChildren = firstChildren.LastChildrens[secondChildIndex]
    secondChildren.selectedChildren = !secondChildren.selectedChildren
    if (secondChildren.selectedChildren) {
      this.categoryFilters.push(secondChildren.id)
    } else {
      this.categoryFilters = this.categoryFilters.filter(id => id != secondChildren.id)
      firstChildren.selectedchild = []
    }
  }
  // filtering with the category

  // Filter With Brand
  brandsFilter: any[] = []
  selectBrand(brand: any, index: number) {
    if (this.brandsFilterData[index].isSelectedbrand.length !== 0) {
      this.brandsFilter.push(this.brandsFilterData[index].id)
    } else {
      this.brandsFilter = this.brandsFilter.filter(id => id != this.brandsFilterData[index].id)
    }
  }
  // end brands filter

  // start color Filer
  colorsFilter: any[] = []
  selectColor(index: number) {
    this.colors[index].selectedColor = !this.colors[index].selectedColor
    if (this.colors[index].selectedColor) {
      this.colorsFilter.push(this.colors[index].id)
    } else {
      this.colorsFilter = this.colorsFilter.filter(id => id != this.colors[index].id)
      // firstChildren.selectedchild = []
    }
  }
  //  end color Filter

  // Start size Filter
  selectAllFlag: any
  sizeFilters: any[] = []
  SelectAllSizes() {
    // console.log(this.selectAllFlag);
    // this.selectAllFlag = []
    if (this.selectAllFlag.length !== 0) {
      this.sizes = this.sizes.map((value: any) => {
        return {
          ...value,
          selectedSize: true
        }
      })
      this.sizeFilters = this.sizes
    } else {
      this.sizes = this.sizes.map((value: any) => {
        return {
          ...value,
          selectedSize: false
        }
      })
    }
  }


  selectSize(index: number) {
    // console.log( this.selectAllFlag);
    this.sizes[index].selectedSize = !this.sizes[index].selectedSize
    if (this.sizes[index].selectedSize) {
      this.sizeFilters.push(this.sizes[index].id)
    } else {
      this.sizeFilters = this.sizeFilters.filter(id => id != this.sizes[index].id)
      // firstChildren.selectedchild = []
      this.selectAllFlag = ['false']
    }
    if (this.sizes.length === this.sizeFilters.length) {
      this.selectAllFlag = ['val1']
    }
  }


  // end size filter
  attributeFilters: any[] = []
  selectAttribute(attr: any, index: number) {
    if (this.attributes[index].selectedAttr.length !== 0) {
      this.attributeFilters.push(this.attributes[index].id)
    } else {
      this.attributeFilters = this.attributeFilters.filter(id => id != this.attributes[index].id)
    }
  }


  applyFilters() {
    // this.searchParams = this.searchParams.set(this.paramKey, null);
    delete this.searchParams[this.paramKey]
    this.searchParams = this.searchParams.delete(this.paramKey)
    this.filtersParams = new HttpParams()
    // params = params.delete('token')
     if(this.type === 'PRICE'){
       this.filtersParams = this.filtersParams.append('price_from[]', this.value)
       this.filtersParams = this.filtersParams.append('price_to[]', this.highValue)
      }
    this.categoryFilters.forEach(id => {
      this.filtersParams = this.filtersParams.append('category_id[]', id)
    })
    if (this.parentID !== 0) {
      this.filtersParams = this.filtersParams.append('category_id[]', this.parentID)
    }
    this.brandsFilter.forEach(id => {
      this.filtersParams = this.filtersParams.append('brand_id[]', id)
    })
    this.colorsFilter.forEach(id => {
      this.filtersParams = this.filtersParams.append('attribute_values[]', id)
    })
    this.sizeFilters.forEach(id => {
      this.filtersParams = this.filtersParams.append('attribute_values[]', id)
    })
    this.attributeFilters.forEach(id => {
      this.filtersParams = this.filtersParams.append('attribute_values[]', id)
    })
    this._productListService.filter(this.filtersParams).subscribe((res: any) => {
      this.step = 1
      this.allProducts = res.data.map((product: any) => {
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
      this.resetValues()
    });
  }

  resetValues() {
    this.categoryFilters = []
    this.sizeFilters = []
    this.colorsFilter = []
    this.attributeFilters = []
    this.brandsFilter = []
    this.childs?.forEach((value: any) => {
      value.selectedchild = ['false']
      value.LastChildrens.map((lastChild: any) => {
        lastChild.selectedChildren = false
      })
    })
    this.brandsFilterData?.forEach(element => {
      element.isSelectedbrand = false
    });
    this.colors?.forEach((color) => {
      color.selectedColor = false
    })
    this.sizes = this.sizes?.map((value: any) => {
      return {
        ...value,
        selectedSize: false
      }
    })
    this.selectAllFlag = ['false']
    this.attributes.forEach((value: any) => {
      value.selectedAttr = ['false']
    })
  }

  Reset() {
    this.resetValues()
    this._productListService.resetAllProducts().subscribe((res: any) => {
      // this.step = 1
      this.allProducts = res.data.map((product: any) => {
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
      })
    })
  }

  backStep() {
    this.step = this.step !== 1 ? this.step - 1 : 1;
  }

}
