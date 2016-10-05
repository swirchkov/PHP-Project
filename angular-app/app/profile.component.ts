import { Component, OnInit } from '@angular/core';

//models
import { User } from './models/user';

//session
import { Session } from './session';

// constants
import { Constants } from './constants';

@Component( {
    selector: 'profile',
    templateUrl: 'app/views/profile.component.html',
    styleUrls : [ 'app/styles/profile.component.css', 'app/styles/header.css' ]
})
export class ProfileComponent implements OnInit {
    user: User;
    baseUrl : string = Constants.BaseUrl;

    // modes
    private get ARTICLES() { return "articles"; }
    private get EDIT_ARTICLE() { return "edit article"; }
    private get PROFILE() { return 'profile' }

    // default display all articles
    mode: string = this.ARTICLES;

    constructor() {
        this.user = Session.AuthenticatedUser;
        console.log(this.user);
    }

    ngOnInit() {
        this.user = Session.AuthenticatedUser;
        console.log(this.user);
    }
}