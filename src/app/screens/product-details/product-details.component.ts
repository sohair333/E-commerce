import { HttpParams } from '@angular/common/http';
import { Attribute } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { ProductDetailsService } from 'src/app/Services/product-details.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { finalize } from 'rxjs';
import { SwiperComponent } from 'swiper/angular';
import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  typeParams: HttpParams;
  data!: any;
  cols: any = 2;
  variationData: any[] = [];
  selectedSize: any;
  selectedColor: any;
  variation: any;
  size: any[] = [];
  itemData: any[] = [];
  colors: any[] = [];
  img: any;
  price: any;
  seller: any;
  sku: any;
  quantity: any;
  variationId: any;
  brand: any;
  qty: number = 1;
  output: any[] = [];
  brandLogo: any;
  brandID: number = 0;
  val: any = 3;
  defaultImage: string = '';
  id: any;
  flagDropdown: boolean = false;
  images: any[] = [];
  isSelected: boolean = false;
  colorLegth!: number;
  sizes: any[] = [];
  wishList: any[] = JSON.parse(localStorage.getItem('wishList') || '[]');
  status: boolean = false;
  brandsProducts: any[] = [];
  carts: any[] = [];
  sum: any;
  show: boolean = false;
  checkLang: any;
  colorLengthVariation: any[] = [];
  sizeLengthVariation: any[] = [];
  progressRating: any[] = [];
  isWishedProduct: boolean = false;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  productType: string = '';
  simpleVariations: any[] = [];
  checkLogin: number = 0;
  cartLength: number = 0;

  // productsList: any = this.data.brand.products
  selectionsColor: any[] = [];
  constructor(
    private location: Location,
    private _ProductDetailsService: ProductDetailsService,
    private router: Router,
    private route: ActivatedRoute,
    private FirebaseService: FirebaseService,
    private datePipe: DatePipe
  ) {
    if (localStorage.getItem('AccessToken')) {
      this.checkLogin = 1;
    }
    // if(localStorage.getItem('Item Data')){
    //   this.cartLength = 1
    // }
    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
    this.typeParams = new HttpParams();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.getAllProductDetails();
    });
    this.progressRating = [
      { color: '#5E2D77', backgroundColor: '#5E2D77', value: 'value-80' },
      { color: '#00A599', backgroundColor: '#00A599', value: 'value-60' },
      { color: '#FAB118', backgroundColor: '#FAB118', value: 'value-50' },
      { color: '#F15F30', backgroundColor: '#F15F30', value: 'value-90' },
      { color: '#D92059', backgroundColor: '#D92059', value: 'value-30' },
    ];
    this.setRealTimeData();

  }
  incrementQty() {
    if (this.qty < 5) {
      this.qty++;
    }
  }

  decrementQty() {
    if (this.qty <= 5 && this.qty > 1) {
      this.qty--;
    }
  }

  slideNext() {
    this.swiper?.swiperRef.slidePrev(100);
  }
  slidePrev() {
    this.swiper?.swiperRef.slideNext(100);
  }

  imgSrc(value: any) {
    let src: any = value.target.currentSrc;
    let prev: any = document.getElementById('prev');
    prev.src = src;
    this.isSelected = true;
  }
  clickEvent(product: any) {
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
          this.wishList = this.wishList.filter(
            (wish) => wish.id === product.id
          );
          // insert updated array to local storage
          localStorage.setItem('wishList', JSON.stringify(this.wishList));
        }
      }
    }
  }

  WishedProductMain(data: any) {
    this.isWishedProduct = !this.isWishedProduct;
    if (this.isWishedProduct) {
      this.wishList.push(data);
      // insert  array to local storage
      localStorage.setItem('wishList', JSON.stringify(this.wishList));
    } else {
      for (let i = 0; i < this.wishList.length; ++i) {
        if (this.wishList[i].id === data.id) {
          this.wishList.splice(i, 1);
          this.wishList = this.wishList.filter((wish) => wish.id === data.id);
          // insert updated array to local storage
          localStorage.setItem('wishList', JSON.stringify(this.wishList));
        }
      }
    }
  }
  preview: any;
  getAllProductDetails() {
    this.preview = 1;
    this.show = true;
    this._ProductDetailsService
      .get(1, this.id)
      .pipe(
        finalize(() => {
          this.show = false;
        })
      )
      .subscribe((res: any) => {
        this.data = res.data;
        this.isWishedProduct = this.wishList.some(
          (wishList) => wishList.id === this.data.id
        );
        this.productType = res.data.type.name;
        this.brandID = res.data.brand_id;
        res.data.attributes.forEach((item: any) => {
          if (item.type.id === 8) {
            this.sizeLengthVariation.push(item.values);
          }
          if (item.type.id === 6) {
            this.colorLengthVariation.push(item.values);
          }
          if (item.type.id !== 6 && item.type.id !== 8) {
            this.simpleVariations.push({
              attributeTitle: item.title,
              values: [...item.values],
              variations: res.data.variations,
            });
          }
        });

        this.img = res.data?.images[0]?.url;
        this.defaultImage = res.data?.images[0]?.url;
        this.sku = res.data?.sku;
        this.seller =
          res.data?.variations[0]?.seller_variations[0]?.seller.name;
        this.price = res.data.variations[0]?.seller_variations[0]?.price;
        this.variation = res.data?.variations;
        this.images = res.data.images;
        this.qty = 1;
        this.getProductBrandWishedProducts();
      });
  }

  getProductBrandWishedProducts() {
    this.brandsProducts = this.data.brand.products.map((product: any) => {
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

  BackHome(value: any) {
    this.router.navigate(['/homePage']);
  }

  filteration(filters: any[]) {
    let variations = this.variation;
    filters
      .filter((x) => x)
      .forEach((filter) => {
        variations = variations.filter((variation: any) => {
          return variation.attributeValues.find((attribute: any) => {
            if (
              attribute.attribute_id === filter.attribute_id &&
              attribute.value.id === filter.id
            ) {
              return true;
            }
            return false;
          });
        });
      });
    return variations;
  }

  onSizeChange() {
    this.showSizeErr = false;
    this.showColorErr = false;
    this.output = this.filteration([this.selectedSize, this.selectedColor]);
    this.img =
      this.output[0]?.images.length === 0
        ? this.defaultImage
        : this.output[0]?.images[0]?.url;
    this.price = this.output[0]?.seller_variations[0]?.price;
    // this.quantity = this.qty;
    this.seller = this.output[0]?.seller_variations[0]?.seller.id;
    this.sku = this?.output[0]?.sku;
    // this.variation = this.output[0]?.attributeValues[0]?.variation_id;
    this.size = [];
    this.brand = this.data.brand.title;
    this.size.push({
      id: this.selectedSize.id,
      attribute_id: this.selectedSize.attribute_id,
    });
    this.variationData = [...this.size, ...this.colors];
  }

  code: string = 'this';
  onColorChange(value: any) {
    this.showSizeErr = false;
    this.showColorErr = false;
    this.code = value.code;
    this.selectedColor = value;
    this.output = {
      ...this.filteration([this.selectedSize, this.selectedColor]),
    };
    this.img =
      this.output[0]?.images.length === 0
        ? this.defaultImage
        : this.output[0]?.images[0]?.url;
    this.price = this.output[0]?.seller_variations[0]?.price;
    // this.quantity = this.output[0]?.seller_variations[0]?.quantity;
    this.seller = this.output[0]?.seller_variations[0]?.seller.id;
    this.sku = this?.output[0]?.sku;
    // this.variation = this.output[0]?.attributeValues[0]?.variation_id;
    this.brand = this.data.brand.title;
    this.colors = [];
    this.colors.push({
      id: this.selectedColor.id,
      attribute_id: this.selectedColor.attribute_id,
    });
    this.variationData = [...this.size, ...this.colors];
  }
  back() {
    this.location.back();
  }

  showError: boolean = false;
  showSuccess: boolean = false;
  showSizeErr: boolean = false;
  showColorErr: boolean = false;
  sizeErr: boolean = false;

  addToCart() {
    if (this.productType === 'SIMPLE') {
      this.addSimpleProductMobile();
    } else {
      this.addConfigurableMobile();
    }
  }
  sellerVarationMobile: any;
  addSimpleProductMobile() {
    this.simpleVariations.forEach((simple) => {
      this.sellerVarationMobile = simple.variations[0].seller_variations[0];
    });
    let productData = JSON.parse(localStorage.getItem('Item Data') || '[]');
    //if localStorage empty
    if (productData.length === 0) {
      if (this.qty > this.sellerVarationMobile.quantity) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 1000);
        return;
      }
      localStorage.setItem(
        'Item Data',
        JSON.stringify([{ ...this.sellerVarationMobile, qty: this.qty }])
      );
      this.showSuccess = true;
      setTimeout(() => {
        this.router.navigateByUrl('/View-Cart');
      }, 1000);
    }
    // if adding same item to local storage
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].id === this.sellerVarationMobile?.id) {
        productData[i].qty = productData[i].qty + this.qty;
        if (productData[i].qty > this.sellerVarationMobile?.quantity) {
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 1000);
        } else {
          localStorage.setItem('Item Data', JSON.stringify(productData));
          this.showSuccess = true;
          setTimeout(() => {
            this.router.navigateByUrl('/View-Cart');
          }, 1000);
        }
        return;
      }
    }
    //  adding new item to local storage and the local storage not empty
    for (let i = 0; i < productData.length; i++) {
      if (this.qty > this.sellerVarationMobile?.quantity) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 1000);
        return;
      }
    }
    this.itemData = [
      ...productData,
      ...[{ ...this.sellerVarationMobile, qty: this.qty }],
    ];
    localStorage.setItem('Item Data', JSON.stringify(this.itemData));
    this.showSuccess = true;
    setTimeout(() => {
      this.router.navigateByUrl('/View-Cart');
    }, 1000);
  }

  addConfigurableMobile() {
    let productData = JSON.parse(localStorage.getItem('Item Data') || '[]');

    let hasSizeVariation = false;
    let hasColorVariation = false;
    this.data.attributes.forEach((attribute: any) => {
      if (attribute.type.id === 8) {
        hasSizeVariation = !!attribute.values.length;
      }

      if (attribute.type.id === 6) {
        hasColorVariation = !!attribute.values.length;
      }
    });

    // product already has sizes to be selected
    if (hasSizeVariation) {
      this.showSizeErr = !this.size.length;
    }

    // product already has colors to be selected
    if (hasColorVariation) {
      this.showColorErr = !this.colors.length;
    }
    if (this.showSizeErr || this.showColorErr) return;

    // if localStorage empty
    if (productData.length === 0) {
      if (this.qty > this.output[0].seller_variations[0].quantity) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 1000);
        return;
      }
      localStorage.setItem(
        'Item Data',
        JSON.stringify([
          { ...this.output[0].seller_variations[0], qty: this.qty },
        ])
      );
      this.showSuccess = true;
      setTimeout(() => {
        this.router.navigateByUrl('/View-Cart');
      }, 1000);
    }

    // if adding same item to local storage
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].id === this.output[0]?.seller_variations[0]?.id) {
        productData[i].qty = productData[i].qty + this.qty;
        if (
          productData[i].qty > this.output[0]?.seller_variations[0]?.quantity
        ) {
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 1000);
        } else {
          localStorage.setItem('Item Data', JSON.stringify(productData));
          this.showSuccess = true;
          setTimeout(() => {
            this.router.navigateByUrl('/View-Cart');
          }, 1000);
        }
        return;
      }
    }

    //  adding new item to local storage and the local storage not empty
    for (let i = 0; i < productData.length; i++) {
      if (this.qty > this.output[0]?.seller_variations[0]?.quantity) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 1000);
        return;
      }
    }
    this._ProductDetailsService.productsLength = [
      ...productData,
      ...[{ ...this.output[0]?.seller_variations[0], qty: this.qty }],
    ];
    localStorage.setItem(
      'Item Data',
      JSON.stringify(this._ProductDetailsService.productsLength)
    );
    this.showSuccess = true;
    setTimeout(() => {
      this.router.navigateByUrl('/View-Cart');
    }, 1000);
  }

  gitCarts() {
    let productData = JSON.parse(localStorage.getItem('Item Data') || '[]');
    this._ProductDetailsService.sidebarToggle = false;
    for (let i = 0; i < productData.length; i++) {
      console.log(productData[i]);

      this.typeParams = this.typeParams.set(
        `variations[${i}][id]`,
        productData[i].id
      );
      this.typeParams = this.typeParams.set(
        `variations[${i}][quantity]`,
        productData[i].qty
      );
    }
    this._ProductDetailsService
      .gitProductCart(this.typeParams)
      .pipe(
        finalize(() => {
          // this._ProductDetailsService.sidebarToggle = true;
        })
      )
      .subscribe((res: any) => {
        let quanities = res.data.map((cart: any) => Number(cart.quantity));
        this._ProductDetailsService.addedItems = quanities.reduce(
          (a: any, b: any) => a + b,
          0
        );
        this._ProductDetailsService.sidebarToggle = true;
        this.carts = res.data;
        this.sum = 0;
        this.carts.forEach((cartData: any, index: number) => {
          this.carts[index].flag = false;
          this.sum =
            this.sum + cartData?.quantity * cartData?.sellerVariation?.price;
        });
      });
  }
  // add to card web View
  addToCartWeb() {
    if (this.productType === 'SIMPLE') {
      this.addSimpleProduct();
    } else {
      this.addConfigurableProduct();
    }
  }
  producrView: any;
  setRealTimeData() {
    this.FirebaseService.userObject = {
      addToCart: '0',
      checkOut: '0',
      online: 1,
      platformType: 'WEB_DESKTOP', // should be enum model
      productView: '1',
      purchase: '0',
      updatedDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      userId: localStorage.getItem('uniqueId'),
      userIsLogin: this.checkLogin,
    };
    this.FirebaseService.setUSerData(this.FirebaseService.userObject);
  }
  sellerVaration: any;
  addSimpleProduct() {
    this.simpleVariations.forEach((simple) => {
      this.sellerVaration = simple.variations[0].seller_variations[0];
    });
    let productData = JSON.parse(localStorage.getItem('Item Data') || '[]');
    //if localStorage empty
    if (productData.length === 0) {
      if (this.qty > this.sellerVaration.quantity) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 1000);
        return;
      }
      console.log(this.sellerVaration);
      localStorage.setItem(
        'Item Data',
        JSON.stringify([{ ...this.sellerVaration, qty: this.qty }])
      );
      this.gitCarts();
    }
    // if adding same item to local storage
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].id === this.sellerVaration?.id) {
        productData[i].qty = productData[i].qty + this.qty;
        if (productData[i].qty > this.sellerVaration?.quantity) {
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 1000);
        } else {
          localStorage.setItem('Item Data', JSON.stringify(productData));
          this.gitCarts();
        }
        return;
      }
    }
    //  adding new item to local storage and the local storage not empty
    for (let i = 0; i < productData.length; i++) {
      if (this.qty > this.sellerVaration?.quantity) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 1000);
        return;
      }
    }
    this.itemData = [
      ...productData,
      ...[{ ...this.sellerVaration, qty: this.qty }],
    ];
    localStorage.setItem('Item Data', JSON.stringify(this.itemData));
    this.cartLength = 1;
    this.gitCarts();
  }

  addConfigurableProduct() {
    let hasSizeVariation = false;
    let hasColorVariation = false;
    this.data.attributes.forEach((attribute: any) => {
      if (attribute.type.id === 8) {
        hasSizeVariation = !!attribute.values.length;
      }

      if (attribute.type.id === 6) {
        hasColorVariation = !!attribute.values.length;
      }
    });

    // product already has sizes to be selected
    if (hasSizeVariation) {
      this.showSizeErr = !this.size.length;
    }

    // product already has colors to be selected
    if (hasColorVariation) {
      this.showColorErr = !this.colors.length;
    }
    if (this.showSizeErr || this.showColorErr) return;
    this.cartLength = 1;
    this.addData();
  }

  addData() {
    let productData = JSON.parse(localStorage.getItem('Item Data') || '[]');
    //if localStorage empty
    if (productData.length === 0) {
      if (this.qty > this.output[0].seller_variations[0].quantity) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 1000);
        return;
      }
      localStorage.setItem(
        'Item Data',
        JSON.stringify([
          { ...this.output[0].seller_variations[0], qty: this.qty },
        ])
      );
      this.gitCarts();
    }
    // if adding same item to local storage
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].id === this.output[0]?.seller_variations[0]?.id) {
        productData[i].qty = productData[i].qty + this.qty;
        if (
          productData[i].qty > this.output[0]?.seller_variations[0]?.quantity
        ) {
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 1000);
        } else {
          localStorage.setItem('Item Data', JSON.stringify(productData));
          this.gitCarts();
        }
        return;
      }
    }
    //  adding new item to local storage and the local storage not empty
    for (let i = 0; i < productData.length; i++) {
      if (this.qty > this.output[0]?.seller_variations[0]?.quantity) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 1000);
        return;
      }
    }
    this.itemData = [
      ...productData,
      ...[{ ...this.output[0]?.seller_variations[0], qty: this.qty }],
    ];
    localStorage.setItem('Item Data', JSON.stringify(this.itemData));
    this.gitCarts();
  }

  ngOnInit() {}

  viewProducts(brand: any) {
    this.router.navigate(['all-products/', { id: brand.id, title: 'BRAND' }]);
  }
  seeAllProducts() {
    this.router.navigate([
      'all-products/',
      { id: this.brandID, title: 'BRAND' },
    ]);
  }
}
