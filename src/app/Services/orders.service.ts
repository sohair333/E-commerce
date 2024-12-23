import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  SERVER_URL: string = environment.baseUrl

  constructor(private _httpClient: HttpClient) { }
  getData(): Observable<any> {
    return this._httpClient.get(`https://development-api-next.jobsglobal.com:54902/api/v1/jobs/all?pagination_type=paginate&per_page=10`);
  }
  getAllOrders(): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}client/orders/list`);
  }

  getOrderDetails(id: number): Observable<any> {
    return this._httpClient.get(`${this.SERVER_URL}client/orders/${id}`);
  }
}
