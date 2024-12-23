import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private platform: Platform) { }

  //  get isWeb() {
  //   return this.platform.isWeb
  // }

  // get isMobile() {
  //   return this.platform.isMobile
  // }

}
