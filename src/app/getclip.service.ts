import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetclipService {
  constructor(public _http : HttpClient) { }
  public call(info:any){

    return this._http.post('http://localhost:3000/clip',info)

  }

}
