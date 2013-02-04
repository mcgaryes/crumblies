# Discussion 005 - Creational Patterns: Singleton

### Overview

In development, a [singleton](http://en.wikipedia.org/wiki/Singleton_pattern) pattern is a design pattern that restricts the instantiation of a class (or in JavaScripts sake an Prototypal Object) to one object. This is extremely useful when you want to make sure that application wide you're referencing the same object instance. 

The singleton pattern is actually quite easy accomplish with JavaScript as you already have a global variable, the window (in the case of the browser), right out of the gate! However that being the case, it also makes it extremely easy for another library to overwrite your Singletons. So we'll also be covering the simple concept of [namespacing](http://goo.gl/aBnKb) in JavaScript in this discussion as well.

### Further Reading

* [Singleton](http://en.wikipedia.org/wiki/Singleton_pattern)
* [Namespacing](http://goo.gl/aBnKb)
* [JavaScript Modules](http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth)

### Resources

* [Annotated Source Code](http://emcgary.r1l4b.com/discussions/00X_X.html)
* [GitHub](https://github.com/mcgaryes/crumblies/blob/master/js101/discussions/005/)
* [JSBin](http://jsbin.com/irojas/1/edit)
