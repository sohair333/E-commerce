import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  SERVER_URL: string = environment.baseUrl

  constructor(private _httpClient: HttpClient) { }

  get(params: any): Observable<any> {
    return this._httpClient.get(
      `${this.SERVER_URL}client/homepage`, { params: params }
    );
  }

  getBrands(params: any): Observable<any> {
    return this._httpClient.get(
      `${this.SERVER_URL}client/homepage/brand/${params}`
    );
  }

}
