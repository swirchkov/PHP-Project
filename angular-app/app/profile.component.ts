import { Component, OnInit } from '@angular/core';

//models
import { User } from './models/user';
import { Tag } from './models/tag';

//session
import { Session } from './session';

// constants
import { Constants } from './constants';

//service
import { TagService } from './services/tag.service';

// Enumerable
import { Enumerable } from './library/enumerable';

@Component( {
    selector: 'profile',
    templateUrl: 'app/views/profile.component.html',
    styleUrls : [ 'app/styles/profile.component.css', 'app/styles/header.css' ]
})
export class ProfileComponent {
    user: User;
    baseUrl : string = Constants.BaseUrl;
    
    tags : Tag[] = null;
    
    tagEnumerable : Enumerable<Tag> = null;
    private tagsPerView = 8;


    // modes
    private get ARTICLES() { return "articles"; }
    private get EDIT_ARTICLE() { return "edit article"; }
    private get PROFILE() { return 'profile' }

    // default display all articles
    mode: string = this.ARTICLES;

    constructor(private tagService : TagService) {
        this.user = Session.AuthenticatedUser;
    }

    private processTagEnumerable(enumerable : Enumerable<Tag>) {
        this.tagEnumerable = enumerable;
        this.tags = this.tagEnumerable.Next();
    }

    ngOnInit() {
        this.tagService.getMostRelavantTags(this.tagsPerView).then((enumer) => this.processTagEnumerable(enumer));
    }
}