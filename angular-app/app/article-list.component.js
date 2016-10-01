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
var core_1 = require("@angular/core");
// services
var article_service_1 = require("./services/article.service");
var tag_service_1 = require("./services/tag.service");
// constraints
var constraints_1 = require("./constraints");
var ArticleListComponent = (function () {
    function ArticleListComponent(articleService, tagService) {
        this.articleService = articleService;
        this.tagService = tagService;
        this.articles = [];
        this.selectedTag = null;
        this.query = null;
        this.user = constraints_1.Constraints.AuthenticatedUser;
    }
    ArticleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // load articles and tags
        this.articleService.getMostRelavantArticles(5).then(function (articles) { return _this.articles = articles; });
        this.tagService.getMostRelavantTags(8).then(function (tags) { return _this.tags = tags; });
    };
    ArticleListComponent.prototype.filterArticlesByTag = function (tag) {
        var _this = this;
        if (this.selectedTag == tag) {
            this.resetTagSearch();
            return;
        }
        this.selectedTag = tag;
        this.articleService.getArticlesByTag(tag).then(function (articles) { _this.articles = articles; });
    };
    ArticleListComponent.prototype.resetTagSearch = function () {
        var _this = this;
        this.selectedTag = null;
        this.articleService.getMostRelavantArticles(5).then(function (articles) { return _this.articles = articles; });
    };
    ArticleListComponent.prototype.searchByQuery = function (query) {
        var _this = this;
        if (query == "") {
            this.resetQuery();
            return;
        }
        this.query = query;
        this.articleService.getArticlesByQuery(query).then(function (articles) { return _this.articles = articles; });
    };
    ArticleListComponent.prototype.resetQuery = function () {
        var _this = this;
        this.query = null;
        this.articleService.getMostRelavantArticles(5).then(function (articles) { return _this.articles = articles; });
    };
    ArticleListComponent.prototype.gotoArticle = function (article) {
        console.log(article);
    };
    ArticleListComponent = __decorate([
        core_1.Component({
            selector: 'article-list',
            templateUrl: "app/views/article-list.component.html",
            styleUrls: ['app/styles/article-list.component.css']
        }), 
        __metadata('design:paramtypes', [article_service_1.ArticleService, tag_service_1.TagService])
    ], ArticleListComponent);
    return ArticleListComponent;
}());
exports.ArticleListComponent = ArticleListComponent;
//# sourceMappingURL=article-list.component.js.map