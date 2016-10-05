"use strict";
var Session = (function () {
    function Session() {
    }
    Object.defineProperty(Session, "AuthenticatedUser", {
        get: function () { return this.authenticatedUser; },
        set: function (value) { this.authenticatedUser = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Session.authenticatedUser = null;
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=session.js.map