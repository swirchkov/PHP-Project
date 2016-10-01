// angular
import { Injectable } from "@angular/core";

// models
import { Article } from "./../models/article";

// mock 
import { ARTICLES } from './mock.articles'; 

@Injectable()
export class ArticleService {
    private articleRootUrl = 'http://localhost/project/articles/';

    private articles = ARTICLES;

    public getMostRelavantArticles(count : number) : Promise<Article[]> {

        if (this.articles.length > count) {
            return Promise.resolve(this.articles.slice(0, count));
        }
        
        return Promise.resolve(this.articles);
    }

    public getArticlesByTag(tag: string) : Promise<Article[]> {
        return Promise.resolve(
            this.articles.filter((value) => {
                return value.Tags.indexOf(tag) != -1;
            })
        );
    }

    public getArticlesByQuery(query: string): Promise<Article[]> {
        return Promise.resolve(
             this.articles.filter((value) => {
                query = query.toUpperCase();
                return value.Title.toUpperCase().indexOf(query) != -1;
            })
        );
    } 
}