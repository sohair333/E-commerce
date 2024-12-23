import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class HttpService {
  GetUserInfo$: Observable<any>;
  private UserInfo = new Subject<any>();
  user: any
  constructor(private http: Http, private router: Router, private httpClient: HttpClient) {
    this.GetUserInfo$ = this.UserInfo.asObservable();
    this.user = JSON.parse(JSON.stringify(localStorage.getItem('token')));
  }

  // tslint:disable-next-line: typedef
  GETWithParams(url: any, Params: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.user);
    headers = headers.append('Accept-Language', localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '');

    return this.httpClient
      .get(url, {
        params: Params,
        headers : headers
      })
  }
}
