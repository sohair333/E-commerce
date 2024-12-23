import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MobileAuthService {
  SERVER_URL: string = environment.baseUrl
  constructor(private http:HttpClient) { }
  login(data:any):Observable<any>
  {
    return this.http.post(`${this.SERVER_URL}client/login`,data, {observe:'response'})
  }
  register(data:any):Observable<any>
  {
    return this.http.post(`${this.SERVER_URL}client/register`, data, {observe:'response'})
  }
  sendOtp(data:any):Observable<any>
  {
    return this.http.post(`${this.SERVER_URL}${localStorage.getItem('AccessToken')?'client/send-otp':'client/forget-password/send-otp'}`,data, {observe:'response'})
  }
  verifyPhone(data:any):Observable<any>
  {
    return this.http.post(`${this.SERVER_URL}${localStorage.getItem('AccessToken')?'client/verify-otp':'client/forget-password/verify-otp'}`,data, {observe:'response'})
  }
  resetPassword(data:any):Observable<any>
  {
    return this.http.post(`${this.SERVER_URL}client/forget-password/store-password`,data, {observe:'response'})
  }

}
