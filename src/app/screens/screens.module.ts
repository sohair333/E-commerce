import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreensRoutingModule } from './screens-routing.module';
import { MobileAuthComponent } from './mobile-auth/mobile-auth.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { AboutUsScreenComponent } from './about-us-screen/about-us-screen.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ShippingPolicyComponent } from './shipping-policy/shipping-policy.component';
import { JobsComponent } from './jobs/jobs.component';
@NgModule({
  declarations: [
    MobileAuthComponent,
    WishListComponent,
    AboutUsScreenComponent,
    TermsAndConditionComponent,
    PrivacyPolicyComponent,
    ShippingPolicyComponent,
    JobsComponent,
  ],
  imports: [
    CommonModule,
    ScreensRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    SharedModule
  ]
})
export class ScreensModule { }
