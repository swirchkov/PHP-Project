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
var article_1 = require('./models/article');
//session
var session_1 = require('./session');
// constants
var constants_1 = require('./constants');
//service
var tag_service_1 = require('./services/tag.service');
var article_service_1 = require("./services/article.service");
var ProfileComponent = (function () {
    function ProfileComponent(tagService, articleService) {
        this.tagService = tagService;
        this.articleService = articleService;
        this.baseUrl = constants_1.Constants.BaseUrl;
        // tag support
        this.tags = null;
        this.tagEnumerable = null;
        this.tagsPerView = 8;
        this.selectedTags = null;
        //editing
        this.article = new article_1.Article();
        //image file
        this.image = 'initial'; // to prevent error message before first interaction
        // default display all articles
        this.mode = this.ARTICLES;
        this.user = session_1.Session.AuthenticatedUser;
        this.selectedTags = new Array();
    }
    Object.defineProperty(ProfileComponent.prototype, "ARTICLES", {
        // some kind of hack but addition field is too much as for me.
        // modes
        get: function () { return "articles"; },
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
    ProfileComponent.prototype.processTagEnumerable = function (enumerable) {
        this.tagEnumerable = enumerable;
        this.tags = this.tagEnumerable.Next();
    };
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tagService.getMostRelavantTags(this.tagsPerView).then(function (enumer) { return _this.processTagEnumerable(enumer); });
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
    };
    ProfileComponent.prototype.onArticleSubmit = function () {
        var _this = this;
        this.article.Tags = this.selectedTags.map(function (tag) { return tag.Tag; });
        this.article.AuthorId = this.user.Id;
        this.article.AuthorName = this.user.Login;
        this.articleService.pusblishArticle(this.article, this.image).then(function (art) {
            _this.article = art;
            console.log(art);
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: 'app/views/profile.component.html',
            styleUrls: ['app/styles/profile.component.css', 'app/styles/header.css']
        }), 
        __metadata('design:paramtypes', [tag_service_1.TagService, article_service_1.ArticleService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map