import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  SERVER_URL: string = environment.baseUrl;

  constructor(private _http: HttpClient) {}
  getCLientProfile(): Observable<any> {
    return this._http.get(`${this.SERVER_URL}client/profile`);
  }

  changePassword(object:any):Observable<any> {
    return this._http.patch(`${this.SERVER_URL}client/profile/password`,object)
  }
  saveUpdatedProfile(data:any):Observable<any>
  {
    return this._http.put(`${this.SERVER_URL}client/profile`,data);
  }
}
