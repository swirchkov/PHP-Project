"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// angular
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
// rx.js
require('rxjs/add/operator/toPromise');
//models
var user_1 = require("./../models/user");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.loginUrl = "http://localhost/project/account/login.php";
        this.registerUrl = "http://localhost/project/account/register.php";
    }
    UserService.prototype.loginUser = function (user) {
        return this.http.post(this.loginUrl, JSON.stringify({ login: user.Login, password: user.Password })).toPromise()
            .then(function (res) {
            var user = res.json();
            return new user_1.User(user.login, user.email, user.password);
        });
    };
    UserService.prototype.registerUser = function (user) {
        return this.http.post(this.registerUrl, JSON.stringify({ login: user.Login, password: user.Password, email: user.Email }))
            .toPromise().then(function (res) {
            var user = res.json();
            return new user_1.User(user.login, user.email, user.password);
        });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map