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
   constructor(private http:Http) {

    this.countryName ='Australia';
    this.countryId='au';
     }
     
   allCountries = [
     {id:"au",name:"Australia"}, 
     {id:"in",name:"India"}, 
     {id:"uk",name:"UK"}, 
     {id:"usa",name:"USA"}  
    ];

    selectCountry(country){
      this.countryName = country.name;
      this.countryId =  country.id;
    }
  
  ngOnInit() {
  console.log(this.allCountries)
    this.http.get('https://newsapi.org/v1/sources?country=in').subscribe(res=>{
      console.log(res.json());
    })
    
  }

}
