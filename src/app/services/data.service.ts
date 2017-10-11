
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  private readonly newsEndpoint = 'https://newsapi.org/v1/';
  constructor(private _http: Http) {
  }


  getArticles(filter) {
    var queryPrams = this.createQueryString(filter);
    return this._http.get(this.newsEndpoint +'articles'+'?'+ queryPrams)
                    .map(res => res.json());
  }

  getSource(filter){
    var queryPrams = this.createQueryString(filter);
    return this._http.get(this.newsEndpoint+'sources'+'?'+queryPrams)
                    .map(res=>res.json());
  }

  createQueryString(obj:any){
    var parts=[];
    for(var prop in obj){
      var value = obj[prop];
      if(value !=null && value != undefined )
      parts.push( encodeURIComponent(prop)+'='+ encodeURIComponent(value));
    }
    return parts.join('&');
  }

}
