import { SourceQuery } from './../Model/SourceQuery';
import { ArticleQuery } from './../Model/ArticleQuery';
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
  sourceError: any;
  pageLoading:boolean=true;
  countryId;
  countryName;
  news;
  selectedNews;
  title;
  Countries:object =  {
    gb:"UK",
    in:"India",
    us:"USA",
    au:"Australia"
  };
 
 

  constructor(private service: DataService, private route: ActivatedRoute, private storage: StorageService) {
    
    this.countryId = this.storage.getCountry().id;
    this.countryName = this.storage.getCountry().name;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.pageLoading = true;
       var sourceObj =  new SourceQuery(this.countryId);
      sourceObj.category = params.get('category');
      sourceObj.country = params.keys.length ? params.get('id') : this.countryId;
   
      console.log(sourceObj)

      this.title = sourceObj.category + ' ' + this.countryName;
      this.service.getSource(sourceObj)
        .map(res => {
          return res.sources[0];
        })
        .subscribe(source => {
          if (source) {
            this.getNews(source);
          } else {
            sourceObj.country = '';
            this.service.getSource(sourceObj).subscribe(res => {
              var checkCountry =  res.sources[0].country;
              this.sourceError = "No "+sourceObj.category.toUpperCase() +' '+'News available from '+this.countryName;
              this.title = sourceObj.category + ' ' +  this.Countries[checkCountry];
              console.log(res.sources[0]);
              let firstSource = res.sources[0];
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
    var query = new ArticleQuery(source.id);
    this.service.getArticles(query)
      .subscribe(res => {
        this.news = res.articles;
        this.selectedNews = this.news[0];
        this.pageLoading = false;
      })

  }
  closeError (){
    this.sourceError = null;
  }
 


}
