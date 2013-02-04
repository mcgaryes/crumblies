"use strict";

// In development, a [singleton](http://en.wikipedia.org/wiki/Singleton_pattern) pattern is a design pattern that restricts the instantiation of a class (or in JavaScripts sake an Prototypal Object) to one object. This is extremely useful when you want to make sure that application wide you're referencing the same object instance. 

// The singleton pattern is actually quite easy accomplish with JavaScript as you already have a global variable, the window (in the case of the browser), right out of the gate! However that being the case, it also makes it extremely easy for another library to overwrite your Singletons. So we'll also be covering the simple concept of [namespacing](http://en.wikipedia.org/wiki/Namespace_(computer_science)) in JavaScript in this discussion as well.

// Something that I havent mentioned to date, but is somewhat of a useful feature in JavaScript are self executing functions. You can see an example in the following line of code. Basically we just want this function to run as soon as it loads. A lot of JavaScript libraries use this feature when they are writing themselves to the `window` object.
(function() {
	
	// Creating a root variable here is just a bit of best practice. Referencing a lot through the `this` keyword can get confusing in longer scripts. I find its always a good idea to assigning what we've passed in as the context of this self executing function to root. This way whenever you see `root` you know exactly what it is refering to!
	var root = this;

	// And here we're simply going to write our singleton object `Singleton` to the `root` (window) object. And that's it really! You esentially now have a singleton object.
	var Singleton = root.Singleton = {
		property: true,
		method: function() {}
	};

}).call(this);

// Because our `Singleton` class is written on the window object it is now accessible
console.log(Singleton);

// This is all well and good, but what if we dont want to muddy up the `window` object (which isn't best practice if you're not a library or framework) with a bunch of objects. This is where namesapcing comes into play.

// Here we're just going to do the same thing that we did with our original Singleton class, but we're going to be creating our namespace `Namespace`, and writing it to the `window` object instead.
var Namespace = this.Namespace = {};

// Now that we have our namespace ready we could do one of two things...
// 1. We could simply pass the `Namepsace` object as the functions context, the sameway we were passing `window` object before:
(function() {

	var root = this;
	var Singleton = root.Singleton = {
		property: true,
		method: function() {}
	};

}).call(Namespace);

console.log(Namespace);

// 2. Or we could simply write the singleton as an object on the namespace like so:
var Namespace = this.Namespace = {
	Singleton: {
		property: true,
		method: function() {}
	},
	AnotherSingleton: {
		property: true,
		method: function() {}
	}
};

console.log(Namespace);

// What about limiting the ability for a user to simply write over our namespace? This could lead to unwanted consequences and could be potentially tough to track down.
Namespace = this.Namespace = {
	somethingElseEntirely: {
		//
	}
};

// oops :(
console.log(Namespace.Singleton); // logs `undefined`

// Well with ECMAScript 5 we could do something like the following:
Object.defineProperty(this, "AnotherSingleton", {
	// Here we're setting the `configurable` descriptor property to `false` so that this object cannot be deleted from our global (`window`) object. We're also using just a `get` so that it can not be overwritten.
	configurable: false,
	get: function() {
		return {
			property: true,
			method: function() {}
		}
	}
});

console.log(this.AnotherSingleton);

// As you can see we cannot delete the `AnotherSingleton` object and trying to do so will result in an error
try {
	delete this.AnotherSingleton; 
} catch (e) {
	console.log(e); // [TypeError: Cannot delete property 'Singleton' of #<Object>]
}

// Setting configurable does however prevent you from writing new objects onto the Singleton. So keep this in mind when using this approach. Also as I've mentioned in previous discussions, property descriptors have limited browser support with legacy versions of Internet Explorer
this.AnotherSingleton.test = {};

console.log(this.AnotherSingleton.test); // logs `undefined`

// One last thing to mention is that the way in which we are creating these singletons, we could limit what is actually returned and available publicly.
var Namespace = this.Namespace = {};

var Singleton = Namespace.Singleton = (function(){
	// A private method that will be accessible only within this closure
	var privateMethod = function() {
		console.log("private method");
	};
	// Our *interface* to return as public
	return {
		publicMethod:function(){
			console.log("public method");
			privateMethod();
		}
	};
}());

// Notice that you only see the `publicMethod` that we returned from within the module.
console.log(Singleton);

// You can call the `publicMethod` which in turn calls the `privateMethod`:
Singleton.publicMethod();

// But we can't call the `privateMethod` directly. It is esentially private now.
try {
	Singleton.privateMethod();	
} catch (e) {
	console.log(e); // [TypeError: Object #<Object> has no method 'privateMethod']
}