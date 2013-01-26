/* jshint newcap:false */
"use strict";
// The following example is what most people run into when they try to perform multiple processes on an object.
var hello = function(callback) {
	var args = ["hello"];
	callback(args);
};

var world = function(args) {
	args.push("world!");
	console.log(args.join(" "));
};

hello(function(args) {
	world(args);
});

// While this example is very simple you could see where adding subsequent method calls would really start to get messy...
var very = function(args, callback) {
	args.push("very");
	callback(args);
};

var big = function(args, callback) {
	args.push("big");
	callback(args);
};

// As you can see it starts to get very hard to follow. Not to mention we're currently only passing two arguments. Imagine passing 3 or 4!
hello(function(args) {
	very(args, function() {
		big(args, function(args) {
			world(args);
		});
	});
});

// With chaining we can alleviate some of these pains. The following is a simple example that illustrates how we can return the object we're currently working on in an initial method call that can then be be used to call a subsequent method.
hello = function() {
	var obj = {};
	obj.log = ["hello", " "];
	// here we're setting the function world as a property on the object we're about to return.
	obj.world = world;
	// And here we're returning the object that we'll eventually run another method on.
	return obj;
};

world = function() {
	this.log = ["hello", " ", "world", "!"];
	console.log(this.log.join(""));
};

// As you can see when we call `hello` and `world` again we can simple "chain" the methods together you dot notation.
hello().world();

// You might be saying, while that's good an all having to assign the next method in the chain could be as confusing as passing and wrapping in callbacks. This is where the prototype object and a little bit of JavaScript recursion comes to the rescue! 
// We'll simply create a contructor/prototype pair like we've done in previous discussions and combine instance creation with a simple recursion so that we can chain any prototype methods that return the instance.
// The following is a simple MathUtil that makes it possible to chain arithmetic operations.
var MathUtil = function(value, context) {
	// We're checking for context here so that we can use this method both as a function and as a constructor. If a context isn't passed then we know that we need to use the method as a constructor and call the method again from within itself. And we're passing the context (`this`) the second time around to be used to assign the initial value for the util.
	if(context) {
		this.product = value;
	} else {
		return new MathUtil(value, this);
	}
};

// The MathUtil prototype object
MathUtil.prototype = Object.create({}, {
	add: {
		value: function(value) {
			this.product = this.product + value;
			// We're returning `this` (the instance) here so that other methods can be called on (chained) what is returned.
			return this;
		}
	},
	divideBy: {
		value: function(value) {
			this.product = this.product / value;
			return this;
		}
	},
	multiplyBy: {
		value: function(value) {
			this.product = this.product * value;
			return this;
		}
	},
	subtract: {
		value: function(value) {
			this.product = this.product - value;
			return this;
		}
	},
	value: {
		value: function() {
			return this.product;
		}
	}
});

// So as you can see, by writing our simple recursive function `MathUtil` and by returning 'this' in each prototype method we can now chain the calls to perform a sequential process on the initial value (`100`) passed.
var val = MathUtil(100).add(20).divideBy(2).multiplyBy(3).subtract(10).value();
console.log(val); // should output `170`