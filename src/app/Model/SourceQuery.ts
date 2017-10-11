import { RequestOptions } from '@angular/http';
export class SourceQuery{
    private readonly LANGUAGE = 'en';
    private readonly GENERAL_CATEGORY='general';
     constructor(
         public country:string,
         public language?:string,
         public category?:string
         
     ){
         this.language = this.LANGUAGE;
         this.category = this.GENERAL_CATEGORY;


     }
}