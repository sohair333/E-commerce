import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from './ui-modules/theme.modules';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { TranslatePipe } from './translate.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { SplitterPipe } from './splitter.pipe';
import { SellAllButtonComponent } from './components/sell-all-button/sell-all-button.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatTreeModule } from '@angular/material/tree';
import { SidebarModule } from 'primeng/sidebar';
import { SideBarComponent } from './side-bar/side-bar.component';


import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MatSelectModule } from '@angular/material/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { MatTabsModule } from '@angular/material/tabs';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ImageModule } from 'primeng/image';
import { MegaMenuModule } from 'primeng/megamenu';
import { WebLoginComponent } from './web-login/web-login.component';
import { WebRegisterComponent } from './web-register/web-register.component';
import { WebForgetPasswordComponent } from './web-forget-password/web-forget-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebOtpComponent } from './web-otp/web-otp.component';
import { WebResetPasswordComponent } from './web-reset-password/web-reset-password.component';
import { WebAuthComponent } from './web-auth/web-auth.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ShippingPolicyComponent } from './components/shipping-policy/shipping-policy.component';
import { DateformatPipe } from './dateformat.pipe';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import  *  as moment from 'moment';
@NgModule({
  declarations: [
    MenuListItemComponent,
    TranslatePipe,
    SkeletonLoaderComponent,
    SplitterPipe,
    SellAllButtonComponent,
    ProductCardComponent,
    SideBarComponent,
    WebLoginComponent,
    WebRegisterComponent,
    WebForgetPasswordComponent,
    WebOtpComponent,
    WebResetPasswordComponent,
    WebAuthComponent,
    OrdersComponent,
    AboutUsComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    ShippingPolicyComponent,
    DateformatPipe,

  ],
  imports: [
    CommonModule,
    ThemeModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule

  ],
  exports: [
    ThemeModule,
    MenuListItemComponent,
    TranslatePipe,
    TranslateModule,
    SkeletonLoaderComponent,
    SplitterPipe,
    SellAllButtonComponent,
    ProductCardComponent,
    NgOtpInputModule,
    MatTreeModule,
    SideBarComponent,
    SidebarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    InfiniteScrollModule,
    MatInputModule,
    NzMenuModule,
    MatSelectModule,
    NzInputModule,
    NzIconModule,
    NzBreadCrumbModule,
    MatTabsModule,
    CarouselModule,
    ButtonModule,
    AccordionModule,
    ImageModule,
    MegaMenuModule,
    WebAuthComponent,
    OrdersComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    ShippingPolicyComponent,
    TermsAndConditionsComponent
  ]
})
export class SharedModule { }
