import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticPagesService {

  SERVER_URL: string = environment.baseUrl
  constructor(private _httpClient: HttpClient) { }

  getAboutUsContent(): Observable<any> {
    return this._httpClient.get(
      `${this.SERVER_URL}static-pages/about-etmana`
    );
  }

  getTermsContent(): Observable<any> {
    return this._httpClient.get(
      `${this.SERVER_URL}static-pages/terms-and-conditions`
    );
  }
  getPrivacyContent(): Observable<any> {
    return this._httpClient.get(
      `${this.SERVER_URL}static-pages/privacy-policy`
    );
  }
  getShippingContent(): Observable<any> {
    return this._httpClient.get(
      `${this.SERVER_URL}static-pages/shipping-policy`
    );
  }
}
