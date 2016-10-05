import { Component } from '@angular/core';

//models
import { User } from './models/user';

//session
import { Session } from './session';

@Component( {

    templateUrl: 'app/views/profile.component.html',
    styleUrls : [ 'app/styles/profile.component.css', 'app/styles/header.css' ]
})
export class ProfileComponent {
    user: User;

    public constructor() {
        this.user = Session.AuthenticatedUser;
    }
}