"use strict";
var User = (function () {
    function User(login, email, password) {
        if (login === void 0) { login = null; }
        if (email === void 0) { email = null; }
        if (password === void 0) { password = null; }
        this.email = email;
        this.login = login;
        this.password = password;
    }
    Object.defineProperty(User.prototype, "Id", {
        get: function () { return this.id; },
        set: function (value) { this.id = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "Login", {
        get: function () { return this.login; },
        set: function (value) { this.login = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "Email", {
        get: function () { return this.email; },
        set: function (value) { this.email = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "Password", {
        get: function () { return this.password; },
        set: function (value) { this.password = value; },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map