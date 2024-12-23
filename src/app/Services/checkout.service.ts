import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  SERVER_URL: string = environment.baseUrl

  constructor(private _httpClient: HttpClient) { }



  geCoutries():Observable<any>
  {
    return this._httpClient.get(`${environment.baseUrl}countries`)
  }
  geGovern(id: number): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}governorates/${id}`)

  }
  geCities(id: number): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}cities/${id}`)
  }
  getAddresses(): Observable<any> {
    return this._httpClient.get(
      `${this.SERVER_URL}client/addresses`,
    );
  }
  setCustomerAddress(data: any): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}client/addresses`, data);
  }
  updatCustomerAddress(id: number, data: any): Observable<any> {
    return this._httpClient.put(
      `${environment.baseUrl}client/addresses/${id}`, data);
  }

  deleteAddress(id: number): Observable<any> {
    return this._httpClient.delete(
      `${environment.baseUrl}client/addresses/${id}`);
  }

  getPayment(): Observable<any> {
    return this._httpClient.get(
      `${this.SERVER_URL}client/payment-methods`
    );
  }

  sendOrderDetails(body: any) {
    return this._httpClient.post(
      `${this.SERVER_URL}client/orders/checkout/summary`, body
    );
  }

  placeOrder(body: any) {
    return this._httpClient.post(
      `${this.SERVER_URL}client/orders/checkout`, body
    );
  }






}
