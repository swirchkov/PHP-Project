// angular
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

// models
import { Article } from "./../models/article";
import { User } from "./../models/user";

//session
import { Session } from "./../session";

// mock 
import { ARTICLES } from './mock.articles'; 

// library
import { Enumerable } from './../library/enumerable';

// constants
import { Constants } from "./../constants";

@Injectable()
export class ArticleService {
    private articleRootUrl = Constants.BaseUrl + 'articles/';

    private articles = ARTICLES;
    private user: User = null;

    public constructor(private http : Http) {
        this.user = Session.AuthenticatedUser;
     }

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

    public pusblishArticle(article: Article, image: File) : Promise<Article> {
        var formData = new FormData();

        formData.append('title', article.Title);
        formData.append('text', article.Text);
        formData.append('tags', article.Tags.join(' '));
        formData.append('imageFile', image);
        formData.append('authorId', article.AuthorId);

        return this.http.post(this.articleRootUrl + 'create.php', formData).toPromise()
                    .then((res) => this.transformToArticle(res, article));
    }

    private transformToArticle(res: any, req: Article) : Article {
        res = JSON.parse(res._body);
        return new Article(res.Title, req.AuthorName, req.AuthorId, res.Text, res.Tags.split(' '), res.ImageUrl, res.Id);
    } 
}