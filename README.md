JSLinq
======

JSLinq is a project that attempts to bring the "spirit" of the LINQ API to Javascript.  Currently it supports where, single, and first.  It accepts either a simple value or a function to filter on.

Where
---------

```
var array = [1,2,1,4,5];
var matches = array.where(1);
console.log(matches); //[1,1]
```