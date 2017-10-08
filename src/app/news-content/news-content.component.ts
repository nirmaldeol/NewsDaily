import { StorageService } from './../services/storage.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

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
      articleFilter:any = {'source':'', 'sortBy':''};
      


  constructor(private service: DataService, private route: ActivatedRoute, private storage: StorageService) {

    this.countryId = this.storage.getCountry().id;

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
         var sourceObj = {
          'language':'en',
          'country':this.countryId,
        'category':'general'
        };

       if(params.has('id')){
        sourceObj.country = params.get('id');
       }
      this.service.getSource(sourceObj)
      .subscribe(res => {
        console.log(res.json());
        let source =  res.json().sources[0];
        this.getGeneralNews(source.id);
      })
    });
   this.getSportsAndBussinessNews();


  }

  selectedArticle(data) {
    this.selectedNews = data.newValue;
  }
  getGeneralNews(sourceId): void {
    var filter =  this.articleFilter;
    filter.source = sourceId;
    filter.sortBy = 'top';

    this.service.getArticles(filter).subscribe(res => {
      let results = res.articles;
      this.genralNews = results.slice(0,9);
      this.selectedNews = results[0];
    });
  }

  getSportsAndBussinessNews(){
    var sportsFilter = this.articleFilter;
    sportsFilter.source = 'fox-sports';
    sportsFilter.sortBy = 'top';
    var BussinessFilter = this.articleFilter;
    BussinessFilter.source = 'the-wall-street-journal';
    BussinessFilter.sortBy = 'top';
    
    Observable.forkJoin(
      this.service.getArticles(sportsFilter),
      this.service.getArticles(BussinessFilter)      
    ).subscribe(data =>{
      let allSports = data[0].articles;
      console.log(data[0].articles);
      let allBusiness = data[1].articles;
      this.sportsNews = allSports.slice(0, 3);
      this.bussinesNews = allBusiness.slice(0, 3);
      this.moreBussinesNews = allBusiness.slice(3, 6);
    })


    
  }

}
