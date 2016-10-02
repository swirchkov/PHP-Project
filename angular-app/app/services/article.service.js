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
// mock 
var mock_articles_1 = require('./mock.articles');
// library
var enumerable_1 = require('./../library/enumerable');
var ArticleService = (function () {
    function ArticleService() {
        this.articleRootUrl = 'http://localhost/project/articles/';
        this.articles = mock_articles_1.ARTICLES;
    }
    ArticleService.prototype.getMostRelavantArticles = function (count) {
        return Promise.resolve(new enumerable_1.Enumerable(this.articles, count));
    };
    ArticleService.prototype.getArticlesByTag = function (tag, count) {
        return Promise.resolve(new enumerable_1.Enumerable(this.articles.filter(function (value) {
            return value.Tags.indexOf(tag) != -1;
        }), count));
    };
    ArticleService.prototype.getArticlesByQuery = function (query, count) {
        return Promise.resolve(new enumerable_1.Enumerable(this.articles.filter(function (value) {
            query = query.toUpperCase();
            return value.Title.toUpperCase().indexOf(query) != -1;
        }), count));
    };
    ArticleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ArticleService);
    return ArticleService;
}());
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map