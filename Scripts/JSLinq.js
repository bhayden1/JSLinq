(function (undefined) {
    Array.prototype.where = function (filter) {
        var length = this.length;
        var returnArray = new Array();
        if (typeof (filter) !== "function") {
            return this;
        }
        for (var i = 0; i < length; i++) {
            if (filter(this[i])) {
                returnArray.push(this[i]);
            }
        }
        return returnArray;
    };

    Array.prototype.first = function (filter) {
        var length = this.length;
        if (typeof (filter) !== "function") {
            return this;
        }

        for (var i = 0; i < length; i++) {
            if (filter(this[i])) {
                return this[i];
            }
        }

        throw "no matches found for supplied filter";
    };

    Array.prototype.single = function (filter) {
        var length = this.length;
        var match = false;
        var returnValue;

        if (typeof (filter) !== "function") {
            return this;
        }

        for (var i = 0; i < length; i++) {
            if (filter(this[i])) {
                if (!match) {
                    returnValue = this[i];
                    match = true;
                }
                else {
                    throw "multiple items matched filter";
                }
            }
        }

        return returnValue;
    };

})();