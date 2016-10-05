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
// session
var session_1 = require("./session");
var ArticleListComponent = (function () {
    function ArticleListComponent(articleService, tagService) {
        this.articleService = articleService;
        this.tagService = tagService;
        this.articles = [];
        this.selectedTag = null;
        this.query = null;
        this.tagEnumerable = null;
        this.articleEnumerable = null;
        this.articlesPerView = 2;
        this.tagsPerView = 8;
        this.user = session_1.Session.AuthenticatedUser;
    }
    ArticleListComponent.prototype.processArticleEnumerable = function (enumerable) {
        this.articleEnumerable = enumerable;
        this.articles = this.articleEnumerable.Next();
        console.log(enumerable);
    };
    ArticleListComponent.prototype.processTagEnumerable = function (enumerable) {
        this.tagEnumerable = enumerable;
        this.tags = this.tagEnumerable.Next();
    };
    ArticleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // load articles and tags
        this.articleService.getMostRelavantArticles(this.articlesPerView).then(function (enumer) { return _this.processArticleEnumerable(enumer); });
        this.tagService.getMostRelavantTags(this.tagsPerView).then(function (enumer) { return _this.processTagEnumerable(enumer); });
    };
    ArticleListComponent.prototype.filterArticlesByTag = function (tag) {
        var _this = this;
        this.query = null;
        if (this.selectedTag == tag) {
            this.resetFilter();
            return;
        }
        this.selectedTag = tag;
        this.articleService.getArticlesByTag(tag, this.articlesPerView).then(function (enumer) { return _this.processArticleEnumerable(enumer); });
    };
    ArticleListComponent.prototype.resetTagSearch = function () {
        var _this = this;
        this.selectedTag = null;
        this.articleService.getMostRelavantArticles(this.articlesPerView).then(function (enumer) { return _this.processArticleEnumerable(enumer); });
    };
    ArticleListComponent.prototype.searchByQuery = function (query) {
        var _this = this;
        this.selectedTag = null;
        if (query == "") {
            this.resetFilter();
            return;
        }
        this.query = query;
        this.articleService.getArticlesByQuery(query, this.articlesPerView)
            .then(function (enumer) { return _this.processArticleEnumerable(enumer); });
    };
    ArticleListComponent.prototype.resetFilter = function () {
        var _this = this;
        this.query = null;
        this.selectedTag = null;
        this.articleService.getMostRelavantArticles(this.articlesPerView).then(function (enumer) { return _this.processArticleEnumerable(enumer); });
    };
    ArticleListComponent.prototype.gotoArticle = function (article) {
        console.log(article);
    };
    ArticleListComponent.prototype.logOut = function () {
        this.user = null;
        session_1.Session.AuthenticatedUser = null;
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