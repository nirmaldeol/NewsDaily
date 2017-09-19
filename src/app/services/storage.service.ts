import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }
  setCountry(country){
       localStorage.setItem('id',JSON.stringify(country.id));
       localStorage.setItem('name', JSON.stringify(country.name));
  }
 getCountry(){
    let country = {
      'id':JSON.parse(localStorage.getItem('id')),
      'name':JSON.parse(localStorage.getItem('name'))
    }
 return country;
  }

}
