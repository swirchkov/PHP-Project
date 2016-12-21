// angular
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

// rx.js
import 'rxjs/add/operator/toPromise';

//models
import { User } from "./../models/user";

// constants
import { Constants } from './../constants';

@Injectable()
export class UserService {
    
    private loginUrl = Constants.BaseUrl + "/account/login.php";
    private registerUrl = Constants.BaseUrl + "/account/register.php";
    private updateUrl = Constants.BaseUrl + "/account/update.php";

    public constructor(private http: Http) {}

    private transformResponseToUser(res : any ) : User {
        var user = res.json();

        if (user != null) {
            return new User(user.login, user.email, user.password, user.imageSrc,"", +user.id );
        }
        else {
            return null;
        }
    } 

    public loginUser(user : User) : Promise<User> {
        return this.http.post(this.loginUrl, JSON.stringify({ login: user.Login, password: user.Password })).toPromise()
        .then((res) => this.transformResponseToUser(res));
    }

    public registerUser(user : User, imageId: string) : Promise<User> {
        var formData = new FormData();
        formData.append('login', user.Login);
        formData.append('password', user.Password);
        formData.append('email', user.Email);
        formData.append('file', this.getImageFile(imageId));

        return this.http.post(this.registerUrl, formData)
        .toPromise().then((res) => this.transformResponseToUser(res));
    }

    public editUser(user : User, imageId: string) : Promise<User> {
        var formData = new FormData();
        formData.append('id', user.Id);
        formData.append('login', user.Login);
        formData.append('password', user.Password);
        formData.append('email', user.Email);
        formData.append('file', this.getImageFile(imageId));

        return this.http.post(this.updateUrl, formData)
            .toPromise().then((res) => this.transformResponseToUser(res));
    }

    private getImageFile(id: string) {
        return (<HTMLInputElement>document.getElementById(id)).files[0];
    }

}