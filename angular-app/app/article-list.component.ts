import { Component, OnInit } from "@angular/core";

// models
import { User } from "./models/user";
import { Article } from "./models/article";
import { Tag } from "./models/tag";

// services
import { ArticleService } from "./services/article.service";
import { TagService } from "./services/tag.service";

// constraints
import { Constraints } from "./constraints";

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

    constructor(private articleService : ArticleService, private tagService: TagService) {
        this.user = Constraints.AuthenticatedUser;
    }

    ngOnInit() {
        // load articles and tags
        this.articleService.getMostRelavantArticles(5).then((articles) => this.articles = articles);
        this.tagService.getMostRelavantTags(8).then((tags) => this.tags = tags);
    }

    public filterArticlesByTag(tag: string) {
        if (this.selectedTag == tag) {
            this.resetTagSearch();
            return;
        }

        this.selectedTag = tag;
        this.articleService.getArticlesByTag(tag).then((articles) => { this.articles = articles });
    }

    private resetTagSearch() {
        this.selectedTag = null;
        this.articleService.getMostRelavantArticles(5).then((articles) => this.articles = articles);

    }

    public searchByQuery(query : string) {

        if (query == "") {
            this.resetQuery();
            return;
        }

        this.query = query;

        this.articleService.getArticlesByQuery(query).then((articles) => this.articles = articles);
    }

    public resetQuery() {
        this.query = null;
        this.articleService.getMostRelavantArticles(5).then((articles) => this.articles = articles);
    } 

    public gotoArticle(article: Article) {
        console.log(article);
    }
}