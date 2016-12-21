"use strict";
var Tag = (function () {
    function Tag(tag, id) {
        if (tag === void 0) { tag = null; }
        if (id === void 0) { id = 0; }
        this.tag = tag;
        this.id = id;
    }
    Object.defineProperty(Tag.prototype, "Id", {
        get: function () { return this.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tag.prototype, "Tag", {
        get: function () { return this.tag; },
        enumerable: true,
        configurable: true
    });
    return Tag;
}());
exports.Tag = Tag;
//# sourceMappingURL=tag.js.map