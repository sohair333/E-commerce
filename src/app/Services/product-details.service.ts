import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})

export class ProductDetailsService {
  SERVER_URL: string = environment.baseUrl
  sidebarToggle: boolean = false
  productsLength: any
  addedItems:number = 0
  constructor(private _httpClient: HttpClient) { }

  get(params: any, id: number): Observable<any> {
    return this._httpClient.get(
      `${this.SERVER_URL}product/${id}`, { params: params }
    );
  }

  gitProductCart(params: any) {
    return this._httpClient.get(
      `${this.SERVER_URL}client/carts/guest`, { params: params }
    );
  }

}
