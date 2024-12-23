import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsListService {

  constructor(private _http:HttpClient) { }

  getData(){
    this._http.get(`https://development-api-next.jobsglobal.com:54902/api/v1/jobs/all?pagination_type=paginate&per_page=10`);
  }
}
