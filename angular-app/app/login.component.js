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
var router_1 = require("@angular/router");
// models
var user_1 = require("./models/user");
var error_1 = require("./models/error");
//service
var user_service_1 = require("./services/user.service");
// session
var session_1 = require('./session');
var LoginComponent = (function () {
    function LoginComponent(service, router) {
        this.service = service;
        this.router = router;
        this.user = new user_1.User();
        this.error = null;
    }
    LoginComponent.prototype.loginUser = function () {
        var _this = this;
        this.authenticating();
        // save user somewhere and redirect to main page
        this.service.loginUser(this.user).then(function (user) {
            if (user == null) {
                _this.authenticationFail();
                return;
            }
            session_1.Session.AuthenticatedUser = user;
            _this.user = user;
            _this.router.navigate(['articles']);
        });
    };
    LoginComponent.prototype.authenticating = function () {
        this.error = null;
    };
    LoginComponent.prototype.authenticationFail = function () {
        this.error = new error_1.Error('', 'invalid login or password');
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-component',
            templateUrl: 'app/views/login.component.html',
            styleUrls: ['app/styles/login.component.css', 'app/styles/header.css']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map