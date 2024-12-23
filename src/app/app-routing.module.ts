import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './Services/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./screens/screens.module').then((m) => m.ScreensModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
