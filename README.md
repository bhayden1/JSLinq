JSLinq
======

JSLinq is a project that attempts to bring the spirit of the .NET LINQ API to Javascript.  Currently it supports where, single, and first.  It accepts either a simple value or a function to filter on.

Usage
-----
Using a simple filter:
```
var array = [1,2,1,4,5];
var matches = array.where(1);
console.log(matches); //[1,1]
```

Using a function filter:
```
var array = [1,2,1,4,5];
var filter = function(value) {
    return value === 1;
}
var matches = array.where(filter);
```
Single will throw an exception when multiple items are found.
```
var array = [1,2,1,4,5];
var single = array.single(1); //will throw an exception
```