import { HttpParams } from '@angular/common/http';
import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/Services/home-page.service';
import { ProductDetailsService } from 'src/app/Services/product-details.service';
import { AuthService } from '../auth/services/auth-service.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { HttpService } from 'src/app/Services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { navBarApi } from 'src/app/config/Apis';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from '../services/direction.service';
import { ProductListService } from 'src/app/Services/product-list.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  SelectItem,
} from 'primeng/api';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { CurrentLocationService } from 'src/app/Services/current-location.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from 'ng-connection-service';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
  MediaMatcher,
} from '@angular/cdk/layout';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  myAccountTab?: string;
  @Input() id: any;
  selected = 'ar';
  selectedLanguage: any;
  selectedFlag: any;
  isLogined: boolean = true;
  Div1: boolean = true;
  Div2: boolean = false;
  Div3: boolean = false;
  banner_type: number = 1;
  navBarList: [] | any;
  womenList: [] | any = [];
  womenListTopBrands: [] | any = [];
  menList: [] | any = [];
  menListTopBrands: [] | any = [];
  childList: [] | any = [];
  childListTopBrands: [] | any = [];
  // productData: any[]
  route: string = 'homePage';
  loggedIn: boolean = false;
  displayCart: boolean = false;
  params: any;
  carts: any[] = [];
  sum: any;
  flagDropdown: boolean = false;
  display: boolean = false;
  showMenu: boolean = false;
  tabName?: string;
  dialogToggle: boolean = false;
  tabNameChild: any;
  searchParams: any;
  data: any;
  isHover: boolean = false;
  items: any[] = [];
  dialogLogout: boolean = false;
  userName?: string;
  countries!: any[];
  flag: any;
  checkLang: any;
  showChevron: boolean = false;
  checkLogin: number = 0;
  checkOnline: any = 1;
  isConnected: boolean = true;
  opened: boolean = false;
  sidebarStatus!: string;
  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event:any) {
  //   sessionStorage.setItem('Online', this.checkOnline);
  //   if(navigator.onLine){
  //     this.checkOnline = 1
  //   }
  //   else{
  //     this.checkOnline = 0
  //   }
  // }
  constructor(
    private _location: CurrentLocationService,
    private httpService: HttpService,
    public dialog: MatDialog,
    public router: Router,
    public _AuthService: AuthService,
    public _ProductDetailsService: ProductDetailsService,
    private translate: TranslateService,
    private _diection: DirectionService,
    private FirebaseService: FirebaseService,
    private datePipe: DatePipe,
    private connectionService: ConnectionService,
    public snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {
    sessionStorage.setItem('Online', this.checkOnline);
    if (sessionStorage.getItem('Online')) {
      this.checkOnline = 1;
    } else {
      this.checkOnline = 0;
    }

    if (!localStorage.getItem('uniqueId')) {
      this.FirebaseService.generateUniqueId();
    }

    this.checkLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');

    // @Output() hideComponent = new EventEmitter<any>();
    // _ProductDetailsService.sidebarToggle = true
    this.params = new HttpParams();
    this.searchParams = new HttpParams();
    window.addEventListener('storage', this.storageChanged.bind(this), false);
    window.addEventListener(
      'storage',
      this.storageUserChanged.bind(this),
      false
    );
    this._ProductDetailsService.productsLength = JSON.parse(
      localStorage.getItem('Item Data') || '[]'
    );
    this.userName = JSON.parse(
      localStorage.getItem('user') || '{}'
    )?.first_name;
    this.selectedLanguage =
      localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') === 'en'
        ? 'english'
        : 'arabic';

    if (
      !localStorage.getItem('Country') ||
      localStorage.getItem('Country') == ''
    ) {
      this._location.getLocation().subscribe((res: any) => {
        localStorage.setItem('Country', res.country);
      });
    } else {
      this.selectedFlag =
        localStorage.getItem('Country') === 'Egypt' ? 'eg' : 'sa';
    }

    if (localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') === null) {
      localStorage.setItem('LOCALIZE_DEFAULT_LANGUAGE', 'en');
      this.selectedLanguage = 'english';
    }
    this.countries = [
      {
        img: './../../../../../assets/images/egypt.png',
      },
      {
        img: './../../../../../assets/images/download (3).png',
      },
    ];
  }

  checkMediaQuery() {
    this.breakpointObserver
      .observe(['(max-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.opened = false;
          this.sidebarStatus = 'over';
        } else {
          this.opened = true;
          this.sidebarStatus = 'side';
        }
      });
  }
  storageChanged(event: StorageEvent) {
    if (event.key === 'Item Data') {
      let newArray = JSON.parse(event.newValue || '[]');
      if (
        newArray.length !== this._ProductDetailsService.productsLength.length
      ) {
        this._ProductDetailsService.productsLength = newArray;
      }
    }
  }
  storageUserChanged(event: StorageEvent) {
    if (event.key === 'user') {
      let user = JSON.parse(event.newValue || '{}')?.first_name;
      if (user !== this.userName) {
        this.userName = user;
      }
      this.userName = JSON.parse(
        localStorage.getItem('user') || '{}'
      )?.first_name;
    }
  }
  navbarFixed: boolean = false;
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.navbarFixed = true;
    } else {
      this.navbarFixed = false;
    }
  }

  tabNameChilds(value: any) {
    this.tabName = value;
  }
  changeDialogToggle(value: any) {
    this.dialogToggle = value;
  }
  openDialogCreateAccount() {
    // this.dialog.open(CreateAccountPopupComponent);
    this.tabName = 'register';
    this.dialogToggle = true;
  }
  openDialoglogin() {
    this.tabName = 'login';
    this.dialogToggle = true;
    // this.dialog.open(LoginPopupComponent);
  }

  seeAll(data: any) {
    this.router.navigate(['all-products/', { id: data.id, title: 'CATEGORY' }]);
  }
  seeBrand(data: any) {
    this.router.navigate(['all-products/', { id: data.id, title: 'BRAND' }]);
  }
  viewProducts(id: any) {
    this.router.navigate(['all-products/', { id: id, title: 'CATEGORY' }]);
  }
  click(menu: any) {}

  droping(product: any, index: number) {
    product.flag = !product.flag;
  }
  changeCountry(pos: any) {
    if (pos == 'eg') {
      localStorage.setItem('Country', JSON.stringify('Egypt'));
    } else {
      localStorage.setItem('Country', JSON.stringify('sudia arabia'));
    }
  }
  ngOnInit(): void {
    this.setRealTimeData();

    this.getData();
    this.items = [
      {
        items: [
          {
            // label: 'Update',
            icon: 'pi pi-users',
          },
          {
            // label: 'Delete',
            icon: 'pi pi-id-card',
          },
        ],
      },
      {
        // label: 'Navigate',
        items: [
          {
            label: 'Angular',
            icon: 'pi pi-list',
          },
          {
            // label: 'Router',
            icon: 'pi pi-credit-card',
            routerLink: '/fileupload',
          },
          {
            // label: 'Router',
            icon: 'pi pi-sign-out',
            routerLink: '/fileupload',
          },
        ],
      },
    ];
  }
  addToCart!: any;
  checout!: any;
  productView!: any;
  purcase!: any;
  userObject: any = {};
  setRealTimeData() {
    this.FirebaseService.getUserData().then((value) => {
      if (value !== null) {
        this.FirebaseService.setUSerData(value);
      } else {
        this.FirebaseService.setUSerData(this.FirebaseService.userObject);
      }
    });
  }

  getData() {
    let params: any = { banner_type: 1 };
    var response = this.httpService
      .GETWithParams(navBarApi, params)
      .subscribe((res: any) => {
        this.navBarList = res.data.categories;
        this.womenList = this.navBarList.filter(
          (x: { id: number }) => x.id == 1
        )[0];
        this.womenListTopBrands = this.womenList.top_brands;
        this.menList = this.navBarList.filter(
          (x: { id: number }) => x.id == 2
        )[0];
        this.menListTopBrands = this.menList.top_brands;
        this.childList = this.navBarList.filter(
          (x: { id: number }) => x.id == 3
        )[0];
        this.childListTopBrands = this.childList.top_brands;
      });
  }

  title: any;
  showDiv(i: number, item: any) {
    this.title = item;
    if (i == 1) {
      this.Div2 = false;
      this.Div1 = true;
      this.Div3 = false;
    } else if (i == 2) {
      this.Div2 = true;
      this.Div1 = false;
      this.Div3 = false;
    } else {
      this.Div2 = false;
      this.Div1 = false;
      this.Div3 = true;
    }
  }

  login() {
    this.router.navigate(['/auth']);
  }

  routeToCart() {
    this.router.navigate(['/View-Cart']);
  }

  onItemSelected(route: string) {
    this.router.navigate([route]);
    this.route = route;
    this.showMenu = false;
  }
  hideMenu(data: any) {
    this.showMenu = false;
  }
  onNewArrival(data: any) {
    this.router.navigate(['/all-products', { id: data.id, title: 'CATEGORY' }]);
  }

  backto(valu: any) {
    this.showMenu = false;
  }

  navigateToMenu(value: any) {
    this.showMenu = true;
  }
  GoToWishList() {
    this.router.navigate(['/wishList']);
  }
  GoToViewCart() {
    this.router.navigate(['/View-Cart']);
  }
  selectLanguage(language: any) {
    this.translate.use(language);
    this._diection.directionHtml.next(language);
    localStorage.setItem('LOCALIZE_DEFAULT_LANGUAGE', language);
    window.location.reload();
  }

  selectFlag(falg: any) {
    localStorage.setItem('Country', falg);
    window.location.reload();
  }

  searchProduct(e: any): void {
    const searchValue = e.target.value;
    this.router.navigate([
      'all-products/',
      { id: searchValue, title: searchValue },
    ]);
    this.searchParams = this.searchParams.set('search_key', searchValue);
  }

  hoverOn() {
    this.isHover = true;
  }
  hoverOff() {
    this.isHover = false;
  }

  myAccountTabs(tab: string) {
    this.myAccountTab = tab;
    localStorage.setItem('myAccountTabs', tab);
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.clear();
    this.dialogLogout = false;
    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'Logout Account',
    //   detail: 'Your Already Logout  successfully',
    // });
  }
  cancelledLogout() {
    this.dialogLogout = false;
  }
  ngOnDestroy() {
    sessionStorage.removeItem('Online');
  }
}
