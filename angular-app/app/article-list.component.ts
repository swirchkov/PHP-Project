import { Component, OnInit } from "@angular/core";

// models
import { User } from "./models/user";
import { Article } from "./models/article";
import { Tag } from "./models/tag";

// services
import { ArticleService } from "./services/article.service";
import { TagService } from "./services/tag.service";

// session
import { Session } from "./session";

// library
import { Enumerable } from './library/enumerable';

@Component({
    selector: 'article-list',
    templateUrl: "app/views/article-list.component.html",
    styleUrls: [ 'app/styles/article-list.component.css' ]
})
export class ArticleListComponent implements OnInit {
    // authenticated user if it authenticates
    user : User;

    articles : Article[] = [];
    tags : Tag[];

    selectedTag : string = null;
    query : string = null;

    tagEnumerable : Enumerable<Tag> = null;
    articleEnumerable : Enumerable<Article> = null;

    private articlesPerView = 2;
    private tagsPerView = 8;

    constructor(private articleService : ArticleService, private tagService: TagService) {
        this.user = Session.AuthenticatedUser;
    }

    private processArticleEnumerable(enumerable : Enumerable<Article> ) {
        this.articleEnumerable = enumerable;
        this.articles = this.articleEnumerable.Next();
    }

    private processTagEnumerable(enumerable : Enumerable<Tag>) {
        this.tagEnumerable = enumerable;
        this.tags = this.tagEnumerable.Next();
    }

    ngOnInit() {
        // load articles and tags
        this.articleService.getMostRelavantArticles(this.articlesPerView).then((enumer) => this.processArticleEnumerable(enumer));
        this.tagService.getMostRelavantTags(this.tagsPerView).then((enumer) => this.processTagEnumerable(enumer));

    }

    public filterArticlesByTag(tag: string) {
        this.query = null;

        if (this.selectedTag == tag) {
            this.resetFilter();
            return;
        }

        this.selectedTag = tag;
        this.articleService.getArticlesByTag(tag, this.articlesPerView).then((enumer) => this.processArticleEnumerable(enumer));
    }

    private resetTagSearch() {
        this.selectedTag = null;
        this.articleService.getMostRelavantArticles(this.articlesPerView).then((enumer) => this.processArticleEnumerable(enumer));

    }

    public searchByQuery(query : string) {
        this.selectedTag = null;

        if (query == "") {
            this.resetFilter();
            return;
        }

        this.query = query;

        this.articleService.getArticlesByQuery(query, this.articlesPerView)
                    .then((enumer) => this.processArticleEnumerable(enumer));
    }

    public resetFilter() {
        this.query = null;
        this.selectedTag = null;
        this.articleService.getMostRelavantArticles(this.articlesPerView).then((enumer) => this.processArticleEnumerable(enumer));
    } 

    public gotoArticle(article: Article) {
        console.log(article);
    }

    public logOut() {
        this.user = null;
        Session.AuthenticatedUser = null;
    }
}