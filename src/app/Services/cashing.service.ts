import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CashingService {
  private addProducts = new BehaviorSubject<any>('[]');
  public add$ = this.addProducts.asObservable();

  SERVER_URL: string = environment.baseUrl;

  constructor(private _http: HttpClient) {}

    getCLientProfile(): Observable<any> {
    return this._http.get(`${this.SERVER_URL}client/profile`);
  }

  // getAddProducts(): Observable<string> {   // <-- capital 'O' instead of small 'o'
  //   let userStatus = window.localStorage.getItem('Item Data');
  //   // userStatus = (userStatus === 'false' || userStatus == null) ? 'true' : 'false';
  //   this.addProducts.next(userStatus);
  //   return this.add$;
  // }
}
