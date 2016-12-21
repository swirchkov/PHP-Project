"use strict";
var Enumerable = (function () {
    function Enumerable(arr, elementsPerRequest, startPosition) {
        if (startPosition === void 0) { startPosition = -1; }
        this.arr = arr;
        this.elementsPerRequest = elementsPerRequest;
        this.position = startPosition;
    }
    Enumerable.prototype.Next = function () {
        if (this.arr.length < this.elementsPerRequest) {
            return this.arr;
        }
        if (!this.canMoveNext()) {
            return [];
        }
        this.position++;
        if ((this.position + 1) * this.elementsPerRequest > this.arr.length) {
            return this.arr.slice(this.position * this.elementsPerRequest);
        }
        return this.arr.slice(this.position * this.elementsPerRequest, (this.position + 1) * this.elementsPerRequest);
    };
    Enumerable.prototype.canMoveNext = function () {
        return this.arr.length >= this.elementsPerRequest && (this.position + 1) * this.elementsPerRequest < this.arr.length;
    };
    Enumerable.prototype.Previous = function () {
        if (!this.canMoveBack()) {
            return [];
        }
        this.position--;
        return this.arr.slice(this.position * this.elementsPerRequest, (this.position + 1) * this.elementsPerRequest);
    };
    Enumerable.prototype.Reset = function () {
        this.position = -1;
        return this.Next();
    };
    Enumerable.prototype.canMoveBack = function () {
        return this.position > 0;
    };
    return Enumerable;
}());
exports.Enumerable = Enumerable;
//# sourceMappingURL=enumerable.js.map