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
// constants
var constants_1 = require('./../constants');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.loginUrl = constants_1.Constants.BaseUrl + "/account/login.php";
        this.registerUrl = constants_1.Constants.BaseUrl + "/account/register.php";
    }
    UserService.prototype.transformResponseToUser = function (res) {
        var user = res.json();
        if (user != null) {
            return new user_1.User(user.login, user.email, user.password, user.imageSrc, "", +user.id);
        }
        else {
            return null;
        }
    };
    UserService.prototype.loginUser = function (user) {
        var _this = this;
        return this.http.post(this.loginUrl, JSON.stringify({ login: user.Login, password: user.Password })).toPromise()
            .then(function (res) { return _this.transformResponseToUser(res); });
    };
    UserService.prototype.registerUser = function (user, imageId) {
        var _this = this;
        var formData = new FormData();
        formData.append('login', user.Login);
        formData.append('password', user.Password);
        formData.append('email', user.Email);
        formData.append('file', this.getImageFile(imageId));
        return this.http.post(this.registerUrl, formData)
            .toPromise().then(function (res) { return _this.transformResponseToUser(res); });
    };
    UserService.prototype.getImageFile = function (id) {
        return document.getElementById(id).files[0];
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map