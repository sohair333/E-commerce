import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {


  SERVER_URL: string = environment.baseUrl;

  constructor(private _http: HttpClient) {}

    getAllBrands(): Observable<any> {
    return this._http.get(`${this.SERVER_URL}client/brands`);
  }


}
