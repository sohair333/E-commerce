import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeaderDashboardComponent } from './header-dashboard/header-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpErrorInterceptor } from './interceptors/error-interceptor.service';
import { HttpInterceptorService } from './interceptors/guest-interceptor.service';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './menu/menu.component';
import { FaqsComponent } from './menu/components/faqs/faqs.component';
import { ProfileComponent } from './menu/components/profile/profile.component';
import { AddressesComponent } from './menu/components/addresses/addresses.component';
import { CompanyInfoComponent } from './menu/components/company-info/company-info.component';
import { CreditEtmanaComponent } from './menu/components/credit-etmana/credit-etmana.component';
import { FirebaseService } from '../Services/firebase.service';



export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    HeaderDashboardComponent,
    LayoutComponent,
    MenuComponent,
    FaqsComponent,
    ProfileComponent,
    AddressesComponent,
    CompanyInfoComponent,
    CreditEtmanaComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    FirebaseService
  ],
})
export class CoreModule { }
