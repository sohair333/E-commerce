import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  SERVER_URL: string = environment.baseUrl
  constructor(private _httpClient: HttpClient) { }

  getProducts(params: any): Observable<any> {
    return this._httpClient.get(
      `${this.SERVER_URL}whishlist/guest`,{params:params}
    );
  }

  // whishlist/guest?product_ids[0]=1&product_ids[1]=2
}
