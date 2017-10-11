import { SourceQuery } from './../Model/SourceQuery';
import { StorageService } from './../services/storage.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { ArticleQuery } from '../Model/ArticleQuery';

@Component({
  selector: 'news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css']
})
export class NewsContentComponent implements OnInit {

  moreBussinesNews: any;


  genralNews: any;
  sportsNews: any;
  bussinesNews: any;
  selectedNews: any;
  countryId: any;




  constructor(private service: DataService, private route: ActivatedRoute, private storage: StorageService) {

    this.countryId = this.storage.getCountry().id;

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var sourceObj = new SourceQuery(this.countryId);

      if (params.has('id')) {
        sourceObj.country = params.get('id');
      }
      console.log(sourceObj)
      this.service.getSource(sourceObj)
        .subscribe(res => {
          let source = res.sources[0];
          this.getGeneralNews(source.id);
        })
    });
    this.getSportsAndBussinessNews();


  }

  selectedArticle(data) {
    this.selectedNews = data.newValue;
  }
  getGeneralNews(sourceId): void {
    var query = new ArticleQuery(sourceId);

    this.service.getArticles(query).subscribe(res => {
      let results = res.articles;
      this.genralNews = results.slice(0, 9);
      this.selectedNews = results[0];
    });
  }

  getSportsAndBussinessNews() {
    var sportsQuery = new ArticleQuery('fox-sports')
    var bussinesQuery = new ArticleQuery('the-wall-street-journal');

    Observable.forkJoin(
      this.service.getArticles(sportsQuery),
      this.service.getArticles(bussinesQuery)
    ).subscribe(data => {
      let allSports = data[0].articles;
      let allBusiness = data[1].articles;
      this.sportsNews = allSports.slice(0, 3);
      this.bussinesNews = allBusiness.slice(0, 3);
      this.moreBussinesNews = allBusiness.slice(3, 6);
    })



  }

}
