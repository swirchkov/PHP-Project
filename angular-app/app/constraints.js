"use strict";
var Constraints = (function () {
    function Constraints() {
    }
    Object.defineProperty(Constraints, "AuthenticatedUser", {
        get: function () { return this.authenticatedUser; },
        set: function (value) { this.authenticatedUser = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Constraints.authenticatedUser = null;
    return Constraints;
}());
exports.Constraints = Constraints;
//# sourceMappingURL=constraints.js.map