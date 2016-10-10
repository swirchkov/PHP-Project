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

    private getArticles() : Promise<Article[]> {
        return this.http.get(this.articleRootUrl+ "all.php").toPromise().then((res) => this.transformToArticleArray(res));
    }

    public getMostRelavantArticles(count : number) : Promise<Enumerable<Article>> {
        return this.getArticles().then((arr) => new Enumerable(arr, count));
    }

    public getArticlesByTag(tag: string, count : number) : Promise<Enumerable<Article>> {

        return this.getArticles().then( (arr) =>           
                        new Enumerable( arr.filter((value) => {
                            return value.Tags.indexOf(tag) != -1;
                        }), count)
                    );
    }

    public getArticlesByQuery(query: string, count : number): Promise<Enumerable<Article>> {
        return this.getArticles().then((arr) => {
                    return new Enumerable(
                        arr.filter((value) => {
                            query = query.toUpperCase();
                            return value.Title.toUpperCase().indexOf(query) != -1; 
                        }), count )
                });
    }   

    public getArticlesByUser(user:User, count:number) : Promise<Enumerable<Article>> {
        return this.getArticles().then((arr) => {
            return new Enumerable(arr.filter((article) => article.AuthorId == user.Id ), count);
        });
    }

    public publishArticle(article: Article, image: File) : Promise<Article> {
        var formData = new FormData();

        formData.append('title', article.Title);
        formData.append('text', article.Text);
        formData.append('tags', article.Tags.join(' '));
        formData.append('imageFile', image);
        formData.append('authorId', article.AuthorId);

        return this.http.post(this.articleRootUrl + 'create.php', formData).toPromise()
                    .then((res) => this.transformToArticle(res, article));
    }

    public updateArticle(article:Article, image: File) : Promise<Article> {
        var formData = new FormData();

        formData.append('title', article.Title);
        formData.append('id', article.Id);
        formData.append('text', article.Text);
        formData.append('imageFile', image);
        formData.append('tags', article.Tags.join(' '));
        formData.append('authorId', article.AuthorId);

        return this.http.post(this.articleRootUrl + "update.php", formData).toPromise()
                    .then((res) => this.transformToArticle(res,article));
    }

    public deleteArticle(article: Article) : Promise<string> {
        var formData = new FormData();
        formData.append("Id", article.Id);
        return this.http.post(this.articleRootUrl + "delete.php", formData).toPromise()
                .then((res) => res.json().Result);
    }

    private transformToArticleArray(res: any) {
        res = JSON.parse(res._body);
        return res.map((obj) => 
                    new Article(obj.Title, obj.AuthorName, obj.AuthorId, obj.Text, obj.Tags.split(' '), obj.Image, obj.Id));
    }

    private transformToArticle(res: any, req: Article) : Article {
        res = JSON.parse(res._body);
        return new Article(res.Title, req.AuthorName, req.AuthorId, res.Text, res.Tags.split(' '), res.ImageUrl, res.Id);
    } 
}