function testObject(name, age) {
    return {
        name: name,
        age: age
    };
}

function createTestComplexArray(length) {
    var returnArray = [];
    for(var i=1; i <= length; i++) {
        returnArray.push(testObject("name " + i, i));
    }

    return returnArray;
}

function createSimpleArray() {

}

describe("The Array Where function", function () {
    var testArray = [1, 1, 2, 2];
    var complexArray = createTestComplexArray(5);    

    it("filters simple array as expected", function () {
        var filter = function (val) {
            return val === 1;
        };
        var actual = testArray.where(filter);
        expect(actual.length).toBe(2);
        expect(actual[0]).toBe(1);
        expect(actual[1]).toBe(1);
    });

    it('filters complex array as expected', function () {
        var filter = function (val) {
            return val.age === 1;
        };

        var actual = complexArray.where(filter);
        expect(actual.length).toBe(1);
        expect(actual[0].age).toBe(1);
    });

    it('filters simple array on simple value', function () {
        var actual = testArray.where(1);
        expect(actual.length).toBe(2);
    });

    it('filters complex array on simple value', function () {
        var actual = complexArray.where(1, 'age');
        expect(actual[0].age).toBe(1);
    });

    it("matches simple string on a simple array", function () {
        var mock = ['a', 'a', 1, 1, 'b', "c", "a"];
        var actual = mock.where("a");
        expect(actual.length).toBe(3);
    });
});

describe("The Array First function", function () {
    var testArray = [1, 4, 1, 1, 5];
    var complexArray = createTestComplexArray(5);    

    it("returns the first match on a simple array", function () {
        var filter = function (val) { return val === 5; };
        var actual = testArray.first(filter);
        expect(actual).toBe(5);
    });

    it("returns the first match on a complex array", function () {
        var filter = function (value) { return value.age === 1; };
        var actual = complexArray.first(filter);
        expect(actual.age).toBe(1);
    });

    it("returns the first match on a simple array with a simple filter", function () {
        var actual = testArray.first(4);
        expect(actual).toBe(4);
    });

    it("returns the first match on a complex array with a simple filter", function () {
        var actual = complexArray.first(1, 'age');
        expect(actual.age).toBe(1);
        
    });

    it("returns the first item when no filter is passed", function () {
        var actual = complexArray.first();
        expect(actual.age).toBe(1);
    });
});

describe("The Array single function", function () {
    var testArray = [1, 2, 3, 4];
    var complexArray = createTestComplexArray(5);    

    it("returns match with a filter function on a simple array", function () {
        var filter = function (val) { return val === 3; };
        var actual = testArray.single(filter);
        expect(actual).toBe(3);
    });

    it("returns match with a filter function on a complex array", function () {
        var filter = function (val) { return val.age === 2; };
        var actual = complexArray.single(filter);
        expect(actual.age).toBe(2);
    });

    it("throws an exception when there are multiple values matching filter", function () {
        var array = testArray;
        array.push(3);
        var filter = function (val) { return val === 3; };
        try {
            var match = array.single(filter);
            expect(match).toBe(false);

        } catch (e) {
            var matches = e.match("multiple");
            expect(matches.length > 0).toBe(true);
        }
    });

    it("returns match with a simple filter on a simple array", function () {
        var actual = testArray.single(1);
        expect(actual).toBe(1);
    });

    it("returns match with a simple filter on a complex array", function () {
        var actual = complexArray.single(4, 'age');
        expect(actual.age).toBe(4);
    });

    it("returns single item with no filter", function () {
        var singleArray = [1];
        var actual = singleArray.single();
        expect(actual).toBe(1);
    });
});

describe("The Any function", function () {
    var testArray = [1, 1, 1, 2, 3, 4, 5, 6];
    var emptyArray = [];
    var complexArray = createTestComplexArray(6);
    it("returns true with no filter passed and a populated array", function () {
        var actual = testArray.any();
        expect(actual).toBe(true);
    });

    it("returns false with no filter passed and an empty array", function () {
        var actual = emptyArray.any();
        expect(actual).toBe(false);
    });

    it("returns true when chained off the where clause with results", function () {
        var actual = testArray.where(1).any();
        expect(actual).toBe(true);
    });

    it("returns false when chained off the where clause with no results", function () {
        var actual = testArray.where(7).any();
        expect(actual).toBe(false);
    });

    it("returns true when passed a simple filter on a simple array", function () {
        var actual = testArray.any(4);
        expect(actual).toBe(true);
    });

    it("returns false when passed a simple filter on a simple array with no matches", function () {
        var actual = testArray.any(7);
        expect(actual).toBe(false);
    });

    it("returns true when passed a function filter on a simple array with matches", function () {
        var filter = function (item) { return item === 1; }
        var actual = testArray.any(filter);
        expect(actual).toBe(true);
    });

    it("returns false when passed a function filter on a simply array with no matches", function () {
        var filter = function (item) { return item === 9; }
        var actual = testArray.any(filter);
        expect(actual).toBe(false);
    });

    it("returns true when passed a simple filter on a complex array with matches", function () {
        var actual = complexArray.any(1, "age");
        expect(actual).toBe(true);
    });

    it("returns false when passed a simple filter on a complex array with no matches", function () {
        var actual = complexArray.any(10, "age");
        expect(actual).toBe(false);
    });

    it("returns true when chained off of a where clause with a simple filter on a complex array with matches", function () {
        var actual = complexArray.where(1, "age").any();
        expect(actual).toBe(true);
    });

    it("returns false when chained off of a where clause with a simple filter on a complex array with no matches", function () {
        var actual = complexArray.where(10, "age").any();
        expect(actual).toBe(false);
    });


});