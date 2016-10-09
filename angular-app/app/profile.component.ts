import { Component, OnInit } from '@angular/core';

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
    private get EDIT_ARTICLE() { return "edit article"; }
    private get PROFILE() { return 'profile' }

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

    //image file
    image: any = 'initial'; // to prevent error message before first interaction
                            // some kind of hack but addition field is too much as for me.

    // end section article editing

    // -----------------------------------------------------------------------------------
    
    // section article list

    articles: Article[];
    articleEnumerable: Enumerable<Article>;

    constructor(private tagService : TagService, private articleService : ArticleService) {
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
        this.articleService.getArticlesByUser(this.user, 2).then((enumer) => this.processArticleEnumerable(enumer));
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
    }

    onArticleSubmit() {
        this.article.Tags = this.selectedTags.map((tag) => tag.Tag);
        
        this.article.AuthorId = this.user.Id;
        this.article.AuthorName = this.user.Login;

        this.articleService.pusblishArticle(this.article, this.image).then((art) => { 
            this.article = art; 
            console.log(art);
        });

    }
}