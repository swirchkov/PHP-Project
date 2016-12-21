// angular
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// models
import { User } from "./models/user";
import { Error } from "./models/error";

//service
import { UserService } from "./services/user.service";

// session
import { Session } from './session';

@Component({
    selector: 'login-component',
    templateUrl : './views/login.component.html',
    styleUrls : [ './styles/login.component.css', './styles/header.css' ]
})
export class LoginComponent {
    user: User = new User();
    private error : Error = null;

    public constructor(private service: UserService, private router: Router) {}
    
    public loginUser() {
        this.authenticating();
        // save user somewhere and redirect to main page
        this.service.loginUser(this.user).then((user) => { 

            if (user == null) {
                this.authenticationFail();
                return;
            }

            Session.AuthenticatedUser = user;
            this.user = user; 

            this.router.navigate(['articles']);
        });
    }

    private authenticating() {
        this.error = null;
    }

    private authenticationFail() {
        this.error = new Error('', 'invalid login or password');
    }

}