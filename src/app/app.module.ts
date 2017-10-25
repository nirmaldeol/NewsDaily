import { SpinnerComponent } from './shared/spinner/spinner.component';
import { StorageService } from './services/storage.service';
import { RequestOptionsService } from './services/request-options.service';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions } from '@angular/http';
import {RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ArticlesComponent} from './articles/articles.component';
import { NewsContentComponent } from './news-content/news-content.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { PicNewsComponent } from './pic-news/pic-news.component';
import { SubPagesComponent } from './sub-pages/sub-pages.component';




@NgModule({
  declarations: [
  AppComponent,
  NavbarComponent,
  ArticlesComponent,
  NewsContentComponent,
  ArticleDetailComponent,
  PicNewsComponent,
  SubPagesComponent,
  SpinnerComponent,



  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'',component:NewsContentComponent},
      {path:':id',component:NewsContentComponent},
      {path:':id/:category',component:SubPagesComponent}
      
      
      
    ])

  ],
  providers: [
    StorageService,
    DataService,
    { provide: RequestOptions, useClass: RequestOptionsService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
