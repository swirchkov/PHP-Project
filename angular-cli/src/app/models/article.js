"use strict";
var Article = (function () {
    function Article(title, authorName, authorId, text, tags, imageUrl, id) {
        if (title === void 0) { title = null; }
        if (authorName === void 0) { authorName = null; }
        if (authorId === void 0) { authorId = 0; }
        if (text === void 0) { text = null; }
        if (tags === void 0) { tags = null; }
        if (imageUrl === void 0) { imageUrl = null; }
        if (id === void 0) { id = 0; }
        this.title = title;
        this.authorName = authorName;
        this.authorId = authorId;
        this.id = id;
        this.text = text;
        this.tags = tags;
        this.imageUrl = imageUrl;
    }
    Object.defineProperty(Article.prototype, "Id", {
        get: function () { return this.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Article.prototype, "Title", {
        get: function () { return this.title; },
        set: function (value) { this.title = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Article.prototype, "AuthorName", {
        get: function () { return this.authorName; },
        set: function (value) { this.authorName = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Article.prototype, "AuthorId", {
        get: function () { return this.authorId; },
        set: function (value) { this.authorId = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Article.prototype, "Text", {
        get: function () { return this.text; },
        set: function (value) { this.text = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Article.prototype, "Tags", {
        get: function () { return this.tags; },
        set: function (value) { this.tags = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Article.prototype, "ImageUrl", {
        get: function () { return this.imageUrl; },
        set: function (value) { this.imageUrl = value; },
        enumerable: true,
        configurable: true
    });
    return Article;
}());
exports.Article = Article;
//# sourceMappingURL=article.js.map