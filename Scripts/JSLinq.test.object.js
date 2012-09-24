var testObjects = {
    object1: { name: "Joe", age: 25 },
    object2: { name: "John", age: 22 },
    object3: { name: "Jack", age: 24 },
    object4: { name: "Jill", age: 22 },
    object5: { name: "Sally", age: 27 },
    object6: { name: "Jill", age: 22 },
};

var filter = function(value) { return value.name === "Jill"; };

describe("The object where function", function() {
    it("exists", function() {
        expect(Object.prototype.where).not.toBe(undefined);
    });

    it("filters on a simple value", function() {
        var results = testObjects.where(22, "age");
        expect(results.object2).not.toBe(undefined);
        expect(results.object4).not.toBe(undefined);
        expect(results.object6).not.toBe(undefined);
        expect(results.object1).toBe(undefined);
    });

    it("filters when a function is the filter", function() {
        var results = testObjects.where(filter);
        expect(results.object4).not.toBe(undefined);
        expect(results.object6).not.toBe(undefined);
        expect(results.object1).toBe(undefined);
    });
});

describe("The object first function", function() {
    it("exists", function() {
        expect(Object.prototype.first).not.toBe(undefined);
    });

    it("returns first match with a simple value", function() {
        var results = testObjects.first(22, "age");
        expect(results.object2).not.toBe(undefined);
        expect(results.object4).toBe(undefined);
        expect(results.object6).toBe(undefined);
    });

    it("returns first match with a filter function", function() {
        var results = testObjects.first(filter);
        expect(results.object4).not.toBe(undefined);
        expect(results.object6).toBe(undefined);
    });
});

describe("The object single function", function () {
    it("exists", function() {
        expect(Object.prototype.single).not.toBe(undefined);
    });

    it("returns single match with a simple value", function() {
        var results = testObjects.single("Jack", "name");
        expect(results.object3).not.toBe(undefined);
        expect(results.object1).toBe(undefined);
    });

    it("returns single match with a filter function", function() {
        var singleFilter = function(value) { return value.age === 27; };
        var results = testObjects.single(singleFilter);
        expect(results.object5).not.toBe(undefined);
        expect(results.object1).toBe(undefined);
    });

    it("throws an exception when multiple values are found", function() {
        try {
            testObjects.single(filter);
        }
        catch(e) {
            var matches = e.match("multiple");
            expect(matches.length > 0).toBe(true);
        }
    });
})