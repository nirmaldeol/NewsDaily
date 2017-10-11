export class ArticleQuery {
    constructor(public source:string, public sortBy?:string){ 
     this.sortBy = 'top';
    }
    
}