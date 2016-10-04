// angular
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// models
import { User } from "./models/user";
import { Error } from "./models/error";

//service
import { UserService } from "./services/user.service";

// constraints
import { Constraints } from './constraints';

@Component({
    selector: 'login-component',
    templateUrl : 'app/views/login.component.html',
    styleUrls : [ 'app/styles/login.component.css', 'app/styles/header.css' ]
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

            Constraints.AuthenticatedUser = user;
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