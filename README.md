JSLinq
======

JSLinq is a project that attempts to bring the spirit of the .NET LINQ API to Javascript.  Currently it supports any, where, single, and first.  It accepts either a simple value or a function to filter on.

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
function filter(value) {
    return value === 1;
}
var matches = array.where(filter);
console.log(matches); //[1,1]
```
Single will throw an exception when multiple items are found.
```
var array = [1,2,1,4,5];
var single = array.single(1); //will throw an exception
```
Any can be used with a filter or chained off of where.  Chained from where:
```
var array = [1,2,1,4,5];
var matches = array.where(1).any();
console.log(matches) //true
```
Any using a filter:
```
var array =[1,2,1,4,5];
var matches = array.any(1);
console.log(matches); //true
```
Filtering on more complex object is supported as well.  To do this either pass in a function, or pass in the value and field you want to filter on.  Using a field and value:
```
var people = [
	{ Name : "Jim", Age: 19 },
	{ Name : "Sally", Age: 20 },
	{ Name : "Betty", Age: 19 }
];
var matches = people.where(20, "Age");
console.log(matches) // { Name: "Sally", Age: 20 }
```
Using a filter function:
```
var people = [
	{ Name : "Jim", Age: 19 },
	{ Name : "Sally", Age: 20 },
	{ Name : "Betty", Age: 19 }
];
function filter(value) {
	return value.Name === "Betty";
};
var matches = people.where(filter);
console.log(matches) // { Name: "Betty", Age: 19 }
```