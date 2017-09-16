
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor(private _http: Http) {
  }


  getAll(source, sort) {
    let params = new URLSearchParams();
    params.set("source", source);
    params.set("sortBy", sort);
    let requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this._http.get("https://newsapi.org/v1/articles", requestOptions);
  }

}
