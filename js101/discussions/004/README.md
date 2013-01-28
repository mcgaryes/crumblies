# Discussion 004 - Chaining

### Overview

Chaining of JavaScript methods is a very useful feature of the language. If you're ever finding yourself wanting to perform multiple processes in a row and having to basically nest callbacks within themselves you could alleviate some of this by chaining.

Chaining is where you call one function after another. For example:
	
	function1().function2().function3()

It is usual, but not necessary, for the first function to be a method belonging to a particular object. For instance with the jQuery library most calls start with:

	$('selector')

This starts off the chain with an array of DOM elements matching the selector. In this lesson we'll look at why you would want to chain functions, how you would go about doing it and how you can combine this with a constructor/prototype pair.

### Further Reading

* [JavaScript Recursive Functions](http://www.developerdrive.com/2012/04/javascript-and-recursion/)

### Resources

* [Annotated Source Code](http://emcgary.r1l4b.com/discussions/004_chaining.html)
* [GitHub](https://github.com/mcgaryes/crumblies/blob/master/js101/discussions/004/)
* [JSBin](http://jsbin.com/uqetes/1/edit)
