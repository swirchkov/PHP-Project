// angular
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

// rx.js
import 'rxjs/add/operator/toPromise';

//models
import { User } from "./../models/user";

@Injectable()
export class UserService {
    
    private loginUrl = "http://localhost/project/account/login.php";
    private registerUrl = "http://localhost/project/account/register.php";

    public constructor(private http: Http) {}

    public loginUser(user : User) : Promise<User> {
        return this.http.post(this.loginUrl, JSON.stringify({ login: user.Login, password: user.Password })).toPromise()
        .then((res) => {
            var user = res.json();
            return new User(user.login, user.email, user.password);
        });
    }

    public registerUser(user : User) : Promise<User> {
        return this.http.post(this.registerUrl, JSON.stringify({ login: user.Login, password: user.Password, email: user.Email }))
        .toPromise().then((res) => {
            var user = res.json();
            return new User(user.login, user.email, user.password);
        });
    }

}