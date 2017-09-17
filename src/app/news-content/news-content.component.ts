import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css']
})
export class NewsContentComponent implements OnInit {


  genralNews;
  sportsNews;
  bussinesNews;
  selectedNews;
  country;

  constructor(private service: DataService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      if (params) {
        console.log(params);
        this.country = params.get('id');
      } else {
        this.country = "au";
      }
      console.log(this.country);
      this.service.getSource(this.country,"general").subscribe(res=>{
        console.log(res);
      })
    });
  }

  ngOnInit() {

    this.getGeneralNews();
    this.getSportsNews();
    this.getBussinesNews();


  }

  selectedArticle(data) {
    this.selectedNews = data.newValue;
  }
  getGeneralNews(): void {
    this.service.getAll("abc-news-au", "top").subscribe(res => {
      let results = res.json().articles;
      this.genralNews = results;
      this.selectedNews = results[0];
    });
  }

  getSportsNews(): void {
    this.service.getAll("fox-sports", "top")
      .subscribe(res => {
        let allSports = res.json().articles;
        this.sportsNews = allSports.slice(0, 5);
        console.log(this.sportsNews);
      })
  }

  getBussinesNews(): void {
    this.service.getAll("the-wall-street-journal", "top")
      .subscribe(res => {
        let allBusiness = res.json().articles;
        this.bussinesNews = allBusiness.slice(0, 2);
        console.log(this.sportsNews);
      })

  }

}
