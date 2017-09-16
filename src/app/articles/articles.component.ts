import { DataService } from './../services/data.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'news-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  @Input() articles: any[];
  @Output() selected = new EventEmitter();

  constructor() {

  }
select(article){
  this.selected.emit({newValue: article});

}

  ngOnInit() {

  }

}
