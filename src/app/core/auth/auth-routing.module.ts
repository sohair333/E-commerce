import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/routes';
import { LoginComponent } from './login/login.component';
import { MobileLoginComponent } from './mobile-login/mobile-login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.auth.login,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.auth.login,
    component: LoginComponent
  },
  {
    path: AppRoutes.auth.mobileLogin,
    component: MobileLoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
