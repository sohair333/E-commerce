import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private _httpClient: HttpClient) { }

  saveUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  setToken(jwt: string) {
    localStorage.setItem('AccessToken', jwt);
  }

  getToken(){
    return  localStorage.getItem('AccessToken');
  }

  login(body: any): Observable<any> {
    return this._httpClient.post<any>(`${this.baseUrl}admin/login`, body);
  }

}
