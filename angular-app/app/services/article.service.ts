// angular
import { Injectable } from "@angular/core";

// models
import { Article } from "./../models/article";

// mock 
import { ARTICLES } from './mock.articles'; 

// library
import { Enumerable } from './../library/enumerable';

@Injectable()
export class ArticleService {
    private articleRootUrl = 'http://localhost/project/articles/';

    private articles = ARTICLES;

    public getMostRelavantArticles(count : number) : Promise<Enumerable<Article>> {
        return Promise.resolve(new Enumerable(this.articles, count));
    }

    public getArticlesByTag(tag: string, count : number) : Promise<Enumerable<Article>> {
        return Promise.resolve(
            new Enumerable( this.articles.filter((value) => {
                return value.Tags.indexOf(tag) != -1;
            }), count)
        );
    }

    public getArticlesByQuery(query: string, count : number): Promise<Enumerable<Article>> {
        return Promise.resolve(
             new Enumerable(
                  this.articles.filter((value) => {
                    query = query.toUpperCase();
                    return value.Title.toUpperCase().indexOf(query) != -1;
            }), count )
        );
    } 
}