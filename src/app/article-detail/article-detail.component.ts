import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit  {
  
  @Input() selectedArticle;

  constructor() {
    this.selectedArticle = [];
   }

  ngOnInit() {
  }
 

}
