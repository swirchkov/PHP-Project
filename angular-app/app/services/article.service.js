"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// angular
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
// models
var article_1 = require("./../models/article");
//session
var session_1 = require("./../session");
// mock 
var mock_articles_1 = require('./mock.articles');
// library
var enumerable_1 = require('./../library/enumerable');
// constants
var constants_1 = require("./../constants");
var ArticleService = (function () {
    function ArticleService(http) {
        this.http = http;
        this.articleRootUrl = constants_1.Constants.BaseUrl + 'articles/';
        this.articles = mock_articles_1.ARTICLES;
        this.user = null;
        this.user = session_1.Session.AuthenticatedUser;
    }
    ArticleService.prototype.getArticles = function () {
        var _this = this;
        return this.http.get(this.articleRootUrl + "all.php").toPromise().then(function (res) { return _this.transformToArticleArray(res); });
    };
    ArticleService.prototype.getMostRelavantArticles = function (count) {
        return this.getArticles().then(function (arr) { return new enumerable_1.Enumerable(arr, count); });
    };
    ArticleService.prototype.getArticlesByTag = function (tag, count) {
        return this.getArticles().then(function (arr) {
            return new enumerable_1.Enumerable(arr.filter(function (value) {
                return value.Tags.indexOf(tag) != -1;
            }), count);
        });
    };
    ArticleService.prototype.getArticlesByQuery = function (query, count) {
        return this.getArticles().then(function (arr) {
            return new enumerable_1.Enumerable(arr.filter(function (value) {
                query = query.toUpperCase();
                return value.Title.toUpperCase().indexOf(query) != -1;
            }), count);
        });
    };
    ArticleService.prototype.getArticlesByUser = function (user, count) {
        return this.getArticles().then(function (arr) {
            return new enumerable_1.Enumerable(arr.filter(function (article) { return article.AuthorId == user.Id; }), count);
        });
    };
    ArticleService.prototype.pusblishArticle = function (article, image) {
        var _this = this;
        var formData = new FormData();
        formData.append('title', article.Title);
        formData.append('text', article.Text);
        formData.append('tags', article.Tags.join(' '));
        formData.append('imageFile', image);
        formData.append('authorId', article.AuthorId);
        return this.http.post(this.articleRootUrl + 'create.php', formData).toPromise()
            .then(function (res) { return _this.transformToArticle(res, article); });
    };
    ArticleService.prototype.transformToArticleArray = function (res) {
        res = JSON.parse(res._body);
        return res.map(function (obj) {
            return new article_1.Article(obj.Title, obj.AuthorName, obj.AuthorId, obj.Text, obj.Tags.split(' '), obj.Image, obj.Id);
        });
    };
    ArticleService.prototype.transformToArticle = function (res, req) {
        res = JSON.parse(res._body);
        return new article_1.Article(res.Title, req.AuthorName, req.AuthorId, res.Text, res.Tags.split(' '), res.ImageUrl, res.Id);
    };
    ArticleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ArticleService);
    return ArticleService;
}());
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map