import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../core/layout/layout.component';
import { AppRoutes } from '../routes';
import { AuthGuardGuard } from '../Services/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: AppRoutes.home_page,
        pathMatch: 'full',
      },
      {
        path: AppRoutes.home_page,
        loadChildren: () =>
          import('./home-page/home-page.module').then((m) => m.HomePageModule),
      },
      {
        path: AppRoutes.categories,
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: AppRoutes.AllProducts,
        loadChildren: () =>
          import('./product-list/product-list.module').then(
            (m) => m.ProductListModule
          ),
      },
      {
        path: AppRoutes.details + '/:id',
        loadChildren: () =>
          import('./product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./mobile-auth/mobile-auth.module').then(
            (m) => m.MobileAuthModule
          ),
      },
      {
        path: AppRoutes.viewCard,
        loadChildren: () =>
          import('./view-card/view-card.module').then((m) => m.ViewCardModule),
      },
      {
        path: AppRoutes.checkout,
        loadChildren: () =>
          import('./checkout/checkout.module').then((m) => m.CheckoutModule),
          canActivate:[AuthGuardGuard]
      },
      {
        path: AppRoutes.wishList,
        loadChildren: () =>
          import('./wish-list/wish-list.module').then((m) => m.WishListModule),

      },
      {
        path: AppRoutes.offers,
        loadChildren: () =>
          import('./offers/offers.module').then((m) => m.OffersModule),

      },
      {
        path: AppRoutes.profile,
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
          canActivate:[AuthGuardGuard]

      },
      {
        path: AppRoutes.aboutUS,
        loadChildren: () =>
          import('./about-us-screen/about-us-screen.module').then((m) => m.AboutUsScreenModule),

      },
      {
        path: AppRoutes.termsAndConditions,
        loadChildren: () =>
          import('./terms-and-condition/terms-and-condition.module').then((m) => m.TermsAndConditionModule),

      },
      {
        path: AppRoutes.privacyPolicy,
        loadChildren: () =>
          import('./privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),

      },
      {
        path: AppRoutes.shippingPolicy,
        loadChildren: () =>
          import('./shipping-policy/shipping-policy.module').then((m) => m.ShippingPolicyModule),
      },
      {
        path: AppRoutes.success,
        loadChildren: () =>
          import('./success/success.module').then((m) => m.SuccessModule),
          // canActivate:[AuthGuardGuard]
      },
      {
        path: AppRoutes.allBrands,
        loadChildren: () =>
          import('./all-brands/all-brands.module').then((m) => m.AllBrandsModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreensRoutingModule { }
