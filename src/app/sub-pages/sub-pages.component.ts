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
      this.countryId = params.keys.length ? params.get('id') : this.countryId;
      this.countryId = params.keys.length ? params.get('id') : this.countryId;
      this.category = params.get('category');
      this.title = this.category+' '+this.countryName;
      this.service.getSource(this.category, this.countryId)
        .map(res => {
          return res.json().sources[0];
        })
        .subscribe(source => {
          if (source) {
            this.getNews(source);
          } else {
            this.service.getSource(this.category).subscribe(response => {
              this.title = this.category+' '+'World';
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
    this.service.getAll(source.id, "top")
      .subscribe(res => {
        this.news = res.json().articles;
        this.selectedNews = this.news[0];
        console.log(this.selectedNews)
      })

  }


}
