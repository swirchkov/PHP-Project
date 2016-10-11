import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

//models
import { User } from './models/user';
import { Tag } from './models/tag';
import { Article } from './models/article';

//session
import { Session } from './session';

// constants
import { Constants } from './constants';

//service
import { TagService } from './services/tag.service';
import { ArticleService } from "./services/article.service";

// Enumerable
import { Enumerable } from './library/enumerable';

@Component( {
    selector: 'profile',
    templateUrl: 'app/views/profile.component.html',
    styleUrls : [ 'app/styles/profile.component.css', 'app/styles/header.css' ]
})
export class ProfileComponent {
    baseUrl : string = Constants.BaseUrl;
    
    // current user
    user: User;
    
    // modes
    private get ARTICLES() { return "articles"; }
    private get CREATE_ARTICLE() { return 'create article'; }
    private get EDIT_ARTICLE() { return "edit article"; }
    private get PROFILE() { return 'profile' }
    private get DELETE_ARTICLE() { return "delete article"; }

    // default display all articles
    mode: string = this.ARTICLES;

    // ------------------------------------------------------------------------------------

    // section article editing
    // tag support
    tags : Tag[] = null;
    tagEnumerable : Enumerable<Tag> = null;

    selectedTags: Tag[] = null;

    private tagsPerView = 8;

    //editing
    article: Article = new Article();
    isArticleEditing = false;
    articlesPerView = 2;

    //image file
    image: any; // to prevent error message before first interaction
    isTouched: Boolean = false;

    private extensions = ['jpg', 'png', 'jpeg', 'gif'];

    // end section article editing

    // -----------------------------------------------------------------------------------
    
    // section article list

    articles: Article[];
    articleEnumerable: Enumerable<Article>;


    // end section article list
    // -----------------------------------------------------------------------------------
    // section delete article

    isDeleteExecuted = false;
    responseMessage: string;

    constructor(private tagService : TagService, private articleService : ArticleService, private router : Router) {
        this.user = Session.AuthenticatedUser;
        this.selectedTags = new Array<Tag>();
    }

    private processTagEnumerable(enumerable : Enumerable<Tag>) {
        this.tagEnumerable = enumerable;
        this.tags = this.tagEnumerable.Next();
    }

    private processArticleEnumerable(enumerable : Enumerable<Article>) {
        this.articleEnumerable = enumerable;
        this.articles = this.articleEnumerable.Next();
    }

    ngOnInit() {
        this.tagService.getMostRelavantTags(this.tagsPerView).then((enumer) => this.processTagEnumerable(enumer));
        this.articleService.getArticlesByUser(this.user, this.articlesPerView)
                .then((enumer) => this.processArticleEnumerable(enumer));
    }

    gotoNewArticle() {
        this.mode = this.CREATE_ARTICLE;
        this.article = new Article();
    }

    addTag(tag : Tag) {
        var position = this.selectedTags.indexOf(tag);
        if (position == -1) {
            this.selectedTags.push(tag);
        }
        else {
            this.selectedTags.splice(position, 1);
        }
    }

    onImageChanged($event) {
        this.image = $event.srcElement.files[0];
        this.isTouched = true;
    }

    onArticleSubmit() {
        this.article.Tags = this.selectedTags.map((tag) => tag.Tag);
        
        this.article.AuthorId = this.user.Id;
        this.article.AuthorName = this.user.Login;

        if (!this.isArticleEditing) {
            this.articleService.publishArticle(this.article, this.image).then((art) => { 
                
                this.article = art; 
                this.mode = this.ARTICLES;

                this.articleService.getMostRelavantArticles(this.articlesPerView)
                        .then((enumer) => this.processArticleEnumerable(enumer));
            });
        }
        else {
            this.articleService.updateArticle(this.article, this.image).then((art) => {
                this.article = art;
                this.mode = this.ARTICLES;
            });
        }

    }

    onArticleEdit(article : Article) {
        this.article = article;
        this.selectedTags = this.tags.filter(value => article.Tags.indexOf(value.Tag) != -1);

        this.mode = this.EDIT_ARTICLE;
        this.isArticleEditing = true;
    }

    onDeleteArticle(article : Article) {
        this.article = article;
        this.mode = this.DELETE_ARTICLE;
    }

    onDeleteConfirmed() {
        this.articleService.deleteArticle(this.article).then((result) => {
            this.responseMessage = result;
            this.isDeleteExecuted = true;

            var self = this;

            // show result for 3 seconds
            setTimeout(function () {
                self.mode = self.ARTICLES;
                self.isDeleteExecuted = false;
                self.responseMessage = null;

                self.articleService.getArticlesByUser(self.user, self.articlesPerView)
                    .then((enumer) => self.processArticleEnumerable(enumer));
            }, 1.5 * 1000);

        });
    }

    logOut() {
        Session.AuthenticatedUser = null;
        this.router.navigate([ '/articles' ]);
    }

    private checkImageExtension() {
        if ((<HTMLInputElement>document.getElementById('article-image')).files.length == 0) {
            return true;
        }
        return this.extensions.indexOf(
            (<HTMLInputElement>document.getElementById('article-image')).files[0].name.split('.').pop()) != -1;
    }
}