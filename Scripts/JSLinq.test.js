describe("The Array Where function", function () {
    var testArray = [1, 1, 2, 2];
    it("exists", function () {
        expect(Array.prototype.where).not.toBe(undefined);
    });

    it("does not apply a non function filter", function () {
        var expected = testArray.length;
        var actual = testArray.where();
        expect(actual.length).toBe(expected);
    });

    it("filters array as expected", function () {
        var filter = function (val) {
            return val === 1;
        };
        var actual = testArray.where(filter);

        expect(actual.length).toBe(2);
        expect(actual[0]).toBe(1);
        expect(actual[1]).toBe(1);
    });
});

describe("The Array First function", function () {
    var testArray = [1, 4, 1, 1, 5];

    it("exists", function () {
        expect(Array.prototype.first).not.toBe(undefined);
    });

    it("does not process on non function filter", function () {
        var expected = testArray.length;
        var actual = testArray.first(1);
        expect(expected).toBe(actual.length);
    });

    it("returns the first element that matches filter", function () {
        var filter = function (val) { return val === 5; };
        var actual = testArray.first(filter);
        expect(actual).toBe(5);
    });

    it("throws an exception when no value is found", function () {
        var filter = function (value) { return value === 2; };
        try {
            testArray.first(filter);
            expect(true).toBe(false);
        } catch (e) {
            var matches = e.match("no matches");
            expect(matches.length > 0).toBe(true);
        }
    });
});

describe("The Array single function", function () {
    var testArray = [1, 2, 3, 4];
    it("exists", function () {
        expect(Array.prototype.single).not.toBe(undefined);
    });

    it("does not process a non function filter", function () {
        var expected = testArray.length;
        var actual = testArray.single(1).length;
        expect(actual).toBe(expected);
    });

    it("returns the matching element in the filter", function () {
        var filter = function (val) { return val === 3; }
        var actual = testArray.single(filter);
        expect(actual).toBe(3);
    });

    it("throws an exception when there are multiple values matching filter", function () {
        var array = testArray;
        array.push(3);
        var filter = function (val) { return val === 3; }
        try {
            var match = array.single(filter);
            expect(match).toBe(false);

        } catch (e) {
            var matches = e.match("multiple");
            expect(matches.length > 0).toBe(true);
        }
    });
});