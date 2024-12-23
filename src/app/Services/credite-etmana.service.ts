import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrediteEtmanaService {
  SERVER_URL: string = environment.baseUrl

  constructor(private _http:HttpClient) { }
  getCLientCredit():Observable<any>{
    return this._http.get(`${this.SERVER_URL}client/store-credits`);
  }
}