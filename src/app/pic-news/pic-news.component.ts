import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pic-news',
  templateUrl: './pic-news.component.html',
  styleUrls: ['./pic-news.component.css']
})
export class PicNewsComponent implements OnInit {

  @Input() allNews;

  constructor() { }

  ngOnInit() {
  }

}
