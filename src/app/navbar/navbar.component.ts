import { StorageService } from './../services/storage.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'news-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  countryName:string;
  countryId:string;
   constructor(private http:Http , private storage:StorageService) {
    
    let name = this.storage.getCountry().name;
    let id =  this.storage.getCountry().id;

    this.countryName = name?  name:"Australia";
    this.countryId = id?  id:"au";
    
     }
     
   allCountries = [
     {id:"au",name:"Australia"}, 
     {id:"in",name:"India"}, 
     {id:"uk",name:"UK"}, 
     {id:"us",name:"USA"}  
    ];

    selectCountry(country){
      this.countryName = country.name;
      this.countryId =  country.id;
      this.storage.setCountry(country);      
    }
  
  ngOnInit() {
  // console.log(this.allCountries)
  //   this.http.get('https://newsapi.org/v1/sources?country=in').subscribe(res=>{
  //     console.log(res.json());
  //   })
    
  }

}
