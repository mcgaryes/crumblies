# Discussion 001 - Prototypal Inheritence

### Overview

JavaScript is a [prototype-based](http://en.wikipedia.org/wiki/Prototype-based) scripting language that uses prototypes (*objects*) instead of classes for inheritance. It is possible to simulate many class-based features with prototypes in JavaScript. 

Functions double as Object constructors along with their typical role. Prefixing a function call with `new` creates a new object and makes available any proerties on the constructor's prototype object.

In this lesson we're going to look at an example of the constructor/prototype relationship in order to better understand how inheritence will work with multiple instances of a prototyped object.

### Resources

* [Annotated Source Code](http://emcgary.r1l4b.com/discussions/001_prototypal-inheritance.html)
* [GitHub](https://github.com/mcgaryes/crumblies/blob/master/js101/discussions/001/)
* [JSBin](http://jsbin.com/acuxef/4/edit)