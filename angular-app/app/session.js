"use strict";
// models
var user_1 = require("./models/user");
var Session = (function () {
    function Session() {
    }
    Object.defineProperty(Session, "AuthenticatedUser", {
        get: function () {
            var user = this.authenticatedUser;
            if (user == null) {
                var store = localStorage.getItem('User');
                var parseUser = JSON.parse(store);
                if (parseUser == null) {
                    return null;
                }
                else {
                    return new user_1.User(parseUser.login, parseUser.email, parseUser.password, parseUser.imageSrc, parseUser.imageId, parseUser.id);
                }
            }
            return this.authenticatedUser;
        },
        set: function (value) {
            this.authenticatedUser = value;
            if (value == null) {
                localStorage.removeItem('User');
            }
            localStorage.setItem('User', JSON.stringify(value));
        },
        enumerable: true,
        configurable: true
    });
    ;
    Session.authenticatedUser = null;
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=session.js.map