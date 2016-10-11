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
    selector: 'register',
    templateUrl: 'app/views/register.component.html',
    styleUrls: ['app/styles/header.css', 'app/styles/login.component.css']
})
export class RegisterComponent {
    user: User = new User();
    confirmPassword: string = '';
    isFreeLogin = true;

    private extensions = ['jpg', 'png', 'jpeg', 'gif'];
    
    public constructor(private service: UserService, private router: Router) {}

    public registerUser() {
        this.service.registerUser(this.user, 'avatar').then((user) => {

            console.log(user);

            if (user == null) {
                this.isFreeLogin = false;
                return;
            }

            Session.AuthenticatedUser = user;
            this.user = user; 

            this.router.navigate(['articles']);
        });
    }

    private checkImageExtension() {
        if ((<HTMLInputElement>document.getElementById('avatar')).files.length == 0) {
            return true;
        }
        return this.extensions.indexOf(
            (<HTMLInputElement>document.getElementById('avatar')).files[0].name.split('.').pop()) != -1;
    }
}