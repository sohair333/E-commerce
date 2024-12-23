import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  SERVER_URL: string = environment.baseUrl
  constructor(private _httpClient: HttpClient) { }

  gitOffers(params: any): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}products`, {params: params});
  }

  filterProducts(params: any): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}products-filters`, {
      params: params,
    });
  }

  get(params: any): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}products`, {
      params: params,
    });
  }

  resetAllProducts(): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}products`)
  }

  filter(paramsFilter: any): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}products`, {
      params: paramsFilter,
    });
  }

  searchProduct(params: any): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}products`, {
      params: params,
    });
  }
  sortProduct(params: any): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}products`, {
      params: params,
    });
  }
  brandsProduct(params: any, id: any): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}products`, {
      params: params,
    });
  }

  getbrands(): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}client/brands`);
  }

  gitFilters(): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}products-filters`,)
  }

  updateFitlers(params: any): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}products-filters`, { params: params })
  }
  newArrival(params:any):Observable<any>{
    return this._httpClient.get(`${this.SERVER_URL}products`,{
      params: params,
    })
  }

}
