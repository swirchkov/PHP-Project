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
var core_1 = require('@angular/core');
//session
var session_1 = require('./session');
// constants
var constants_1 = require('./constants');
var ProfileComponent = (function () {
    function ProfileComponent() {
        this.baseUrl = constants_1.Constants.BaseUrl;
        // default display all articles
        this.mode = this.ARTICLES;
        this.user = session_1.Session.AuthenticatedUser;
        console.log(this.user);
    }
    Object.defineProperty(ProfileComponent.prototype, "ARTICLES", {
        // modes
        get: function () { return "articles"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileComponent.prototype, "EDIT_ARTICLE", {
        get: function () { return "edit article"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileComponent.prototype, "PROFILE", {
        get: function () { return 'profile'; },
        enumerable: true,
        configurable: true
    });
    ProfileComponent.prototype.ngOnInit = function () {
        this.user = session_1.Session.AuthenticatedUser;
        console.log(this.user);
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: 'app/views/profile.component.html',
            styleUrls: ['app/styles/profile.component.css', 'app/styles/header.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map