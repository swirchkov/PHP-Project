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
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var article_1 = require('./models/article');
//session
var session_1 = require('./session');
// constants
var constants_1 = require('./constants');
//service
var tag_service_1 = require('./services/tag.service');
var article_service_1 = require("./services/article.service");
var ProfileComponent = (function () {
    function ProfileComponent(tagService, articleService, router) {
        this.tagService = tagService;
        this.articleService = articleService;
        this.router = router;
        this.baseUrl = constants_1.Constants.BaseUrl;
        // default display all articles
        this.mode = this.ARTICLES;
        // ------------------------------------------------------------------------------------
        // section article editing
        // tag support
        this.tags = null;
        this.tagEnumerable = null;
        this.selectedTags = null;
        this.tagsPerView = 8;
        //editing
        this.article = new article_1.Article();
        this.isArticleEditing = false;
        this.articlesPerView = 2;
        this.isTouched = false;
        // end section article list
        // -----------------------------------------------------------------------------------
        // section delete article
        this.isDeleteExecuted = false;
        this.user = session_1.Session.AuthenticatedUser;
        this.selectedTags = new Array();
    }
    Object.defineProperty(ProfileComponent.prototype, "ARTICLES", {
        // modes
        get: function () { return "articles"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileComponent.prototype, "CREATE_ARTICLE", {
        get: function () { return 'create article'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileComponent.prototype, "EDIT_ARTICLE", {
        get: function () { return "edit article"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileComponent.prototype, "PROFILE", {
        get: function () { return 'profile'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileComponent.prototype, "DELETE_ARTICLE", {
        get: function () { return "delete article"; },
        enumerable: true,
        configurable: true
    });
    ProfileComponent.prototype.processTagEnumerable = function (enumerable) {
        this.tagEnumerable = enumerable;
        this.tags = this.tagEnumerable.Next();
    };
    ProfileComponent.prototype.processArticleEnumerable = function (enumerable) {
        this.articleEnumerable = enumerable;
        this.articles = this.articleEnumerable.Next();
    };
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tagService.getMostRelavantTags(this.tagsPerView).then(function (enumer) { return _this.processTagEnumerable(enumer); });
        this.articleService.getArticlesByUser(this.user, this.articlesPerView)
            .then(function (enumer) { return _this.processArticleEnumerable(enumer); });
    };
    ProfileComponent.prototype.gotoNewArticle = function () {
        this.mode = this.CREATE_ARTICLE;
        this.article = new article_1.Article();
    };
    ProfileComponent.prototype.addTag = function (tag) {
        var position = this.selectedTags.indexOf(tag);
        if (position == -1) {
            this.selectedTags.push(tag);
        }
        else {
            this.selectedTags.splice(position, 1);
        }
    };
    ProfileComponent.prototype.onImageChanged = function ($event) {
        this.image = $event.srcElement.files[0];
        this.isTouched = true;
    };
    ProfileComponent.prototype.onArticleSubmit = function () {
        var _this = this;
        this.article.Tags = this.selectedTags.map(function (tag) { return tag.Tag; });
        this.article.AuthorId = this.user.Id;
        this.article.AuthorName = this.user.Login;
        if (!this.isArticleEditing) {
            this.articleService.publishArticle(this.article, this.image).then(function (art) {
                _this.article = art;
                _this.mode = _this.ARTICLES;
                _this.articleService.getMostRelavantArticles(_this.articlesPerView)
                    .then(function (enumer) { return _this.processArticleEnumerable(enumer); });
            });
        }
        else {
            this.articleService.updateArticle(this.article, this.image).then(function (art) {
                _this.article = art;
                _this.mode = _this.ARTICLES;
            });
        }
    };
    ProfileComponent.prototype.onArticleEdit = function (article) {
        this.article = article;
        this.selectedTags = this.tags.filter(function (value) { return article.Tags.indexOf(value.Tag) != -1; });
        this.mode = this.EDIT_ARTICLE;
        this.isArticleEditing = true;
    };
    ProfileComponent.prototype.onDeleteArticle = function (article) {
        this.article = article;
        this.mode = this.DELETE_ARTICLE;
    };
    ProfileComponent.prototype.onDeleteConfirmed = function () {
        var _this = this;
        this.articleService.deleteArticle(this.article).then(function (result) {
            _this.responseMessage = result;
            _this.isDeleteExecuted = true;
            var self = _this;
            // show result for 3 seconds
            setTimeout(function () {
                self.mode = self.ARTICLES;
                self.isDeleteExecuted = false;
                self.responseMessage = null;
                self.articleService.getArticlesByUser(self.user, self.articlesPerView)
                    .then(function (enumer) { return self.processArticleEnumerable(enumer); });
            }, 1.5 * 1000);
        });
    };
    ProfileComponent.prototype.logOut = function () {
        session_1.Session.AuthenticatedUser = null;
        this.router.navigate(['/articles']);
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: 'app/views/profile.component.html',
            styleUrls: ['app/styles/profile.component.css', 'app/styles/header.css']
        }), 
        __metadata('design:paramtypes', [tag_service_1.TagService, article_service_1.ArticleService, router_1.Router])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map