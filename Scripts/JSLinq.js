(function (undefined) {
    function filterArray(value, filter, field) {
        if (typeof (filter) === "function") {
            if (filter(value)) {
                return true;
            }
        }
        else if (filter === value && !field) {
            return true;
        }
        else if (value[field] === filter) {
            return true;
        }
        return false;
    }

    Array.prototype.where = function (filter, field) {
        var length = this.length;
        var returnArray = new Array();
        for (var i = 0; i < length; i++) {
            if (filterArray(this[i], filter, field)) {
                returnArray.push(this[i]);
            }
        }

        return returnArray;
    };

    Array.prototype.first = function (filter, field) {
        var length = this.length;

        for (var i = 0; i < length; i++) {
            if (filterArray(this[i], filter, field)) {
                return this[i];
            }
        }

        throw "no matches found for supplied filter";
    };

    Array.prototype.single = function (filter, field) {
        var length = this.length;
        var match = false;
        var singleExceptionMessage = "multiple items matched filter";
        var returnValue;

        for (var i = 0; i < length; i++) {
            if (filterArray(this[i], filter, field)) {
                if (match) {
                    throw singleExceptionMessage;
                }
                match = true;
                returnValue = this[i];
            }
        }

        if (returnValue) {
            return returnValue;
        }

        throw singleExceptionMessage;
    };

})();