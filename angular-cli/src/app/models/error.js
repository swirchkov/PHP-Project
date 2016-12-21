"use strict";
var Error = (function () {
    function Error(type, message) {
        if (type === void 0) { type = ''; }
        if (message === void 0) { message = ''; }
        this.type = type;
        this.message = message;
    }
    Object.defineProperty(Error.prototype, "Type", {
        get: function () { return this.type; },
        set: function (value) { this.type = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Error.prototype, "Message", {
        get: function () { return this.message; },
        set: function (value) { this.message = value; },
        enumerable: true,
        configurable: true
    });
    return Error;
}());
exports.Error = Error;
//# sourceMappingURL=error.js.map