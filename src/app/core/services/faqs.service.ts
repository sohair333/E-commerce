import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {
  SERVER_URL: string = environment.baseUrl


  constructor(private _http:HttpClient) { }
  get_FQAS():Observable<any>{
    return this._http.get(`${this.SERVER_URL}faqs`);
  }
}
