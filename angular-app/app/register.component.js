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
//service
var user_service_1 = require("./services/user.service");
// constraints
var constraints_1 = require('./constraints');
var RegisterComponent = (function () {
    function RegisterComponent(service, router) {
        this.service = service;
        this.router = router;
        this.user = new user_1.User();
        this.confirmPassword = '';
        this.isFreeLogin = true;
    }
    RegisterComponent.prototype.registerUser = function () {
        var _this = this;
        this.service.registerUser(this.user, 'avatar').then(function (user) {
            console.log(user);
            if (user == null) {
                _this.isFreeLogin = false;
                return;
            }
            constraints_1.Constraints.AuthenticatedUser = user;
            _this.user = user;
            _this.router.navigate(['articles']);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: 'app/views/register.component.html',
            styleUrls: ['app/styles/header.css', 'app/styles/login.component.css']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map