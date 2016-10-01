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
//mock
var mock_tags_1 = require("./mock.tags");
var TagService = (function () {
    function TagService() {
        this.tags = mock_tags_1.TAGS;
    }
    TagService.prototype.getMostRelavantTags = function (count) {
        if (this.tags.length > count) {
            return Promise.resolve(this.tags.slice(0, count));
        }
        return Promise.resolve(this.tags);
    };
    TagService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TagService);
    return TagService;
}());
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map