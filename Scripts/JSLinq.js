(function () {
    "use strict";
    var singleExceptionMessage = "multiple items matched filter";
    function processFilter(value, filter, field) {
        if (typeof (filter) === "function") {
            if (filter(value)) {
                return true;
            }
        } else if (filter === value && !field) {
            return true;
        } else if (value[field] === filter) {
            return true;
        }
        return false;
    }

    Object.prototype.where = function (filter, property) {
        var matches = {};
        for (var key in this) {
            if (processFilter(this[key], filter, property)) {
                matches[key] = this[key];
            }
        }
        return matches;
    };

    Object.prototype.first = function (filter, property) {
        var matches = {};
        for (var key in this) {
            if (processFilter(this[key], filter, property)) {
                matches[key] = this[key];
                return matches;
            }
        }
    };

    Object.prototype.single = function (filter, property) {
        var matches;
        var matchFound = false;
        for (var key in this) {
            if (processFilter(this[key], filter, property)) {
                if (matchFound) {
                    throw singleExceptionMessage;
                }
                matches = {};
                matches[key] = this[key];
            }

        }
        return matches;
    };

    Array.prototype.where = function (filter, field) {
        var length = this.length;
        var returnArray = new Array();
        for (var i = 0; i < length; i++) {
            if (processFilter(this[i], filter, field)) {
                returnArray.push(this[i]);
            }
        }
        return returnArray;
    };

    Array.prototype.first = function (filter, field) {
        var length = this.length;

        for (var i = 0; i < length; i++) {
            if (processFilter(this[i], filter, field)) {
                return this[i];
            }
        }
    };

    Array.prototype.single = function (filter, field) {
        var length = this.length;
        var returnValue;

        for (var i = 0; i < length; i++) {
            if (processFilter(this[i], filter, field)) {
                if (returnValue) {
                    throw singleExceptionMessage;
                }
                returnValue = this[i];
            }
        }
    };

})();