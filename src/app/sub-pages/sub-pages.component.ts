import { StorageService } from './../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'sub-pages',
  templateUrl: './sub-pages.component.html',
  styleUrls: ['./sub-pages.component.css']
})
export class SubPagesComponent implements OnInit {

  countryId;
  countryName;
  category;
  news;
  selectedNews;
  title; 
 


  constructor(private service: DataService, private route: ActivatedRoute, private storage: StorageService) {
    this.countryId = this.storage.getCountry().id;
    this.countryName =  this.storage.getCountry().name;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

        var sourceObj =  {'language':'en','category':'','country':''};
        sourceObj.category = params.get('category');
        sourceObj.country  = params.keys.length ? params.get('id') : this.countryId;

      this.title = sourceObj.category+' '+ this.countryName;
      this.service.getSource(sourceObj)
        .map(res => {
          return res.json().sources[0];
        })
        .subscribe(source => {
          if (source) {
            console.log(source);
            this.getNews(source);
          } else {
            sourceObj.country = '';
            this.service.getSource(sourceObj).subscribe(response => {
            console.log(response);
            
              this.title = sourceObj.category+' '+'World';
              let firstSource = response.json().sources[0];
              this.getNews(firstSource);
            })
          }

        })
    });
  }
  selectedArticle(data) {
    this.selectedNews = data.newValue;
  };

  getNews(source): void {
    var filter = {'source':source.id, 'sortBy':'top'};
    this.service.getArticles(filter)
      .subscribe(res => {
        this.news = res.articles;
        this.selectedNews = this.news[0];
        console.log(this.selectedNews)
      })

  }


}
