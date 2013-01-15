/*global console:false */
"use strict";

// Our mixin functionality. This is a pretty generic mixin function that simply looks at each property in the supplier (which is what we're mixing in) and apply it to the prototype of the current context.
// It is important to note that this is an ECMAScript 5 version of a mixin and will not work in legacy browsers. There are numerous polyfils available for backwards compatibility.
var mixin = function(supplier) {
	var prototype = this.prototype;
	Object.keys(supplier).forEach(function(prop) {
		Object.defineProperty(prototype, prop, Object.getOwnPropertyDescriptor(supplier, prop));
	});
};

// This is a very similar `Vehicle` constructor and prototype from [earlier discussions](https://github.com/mcgaryes/crumblies/tree/master/js101/discussions).
var Vehicle = function(color) {
	this.color = color;
};

// The `Vehicle` prototype
Vehicle.prototype = Object.create({}, {
	type: { value: "none" },
	color: { value: "grey" },
	start: {
		value: function() {
			console.log("Starting the " + this.color + " " + this.type + " up...");
		}
	},
	stop: {
		value: function() {
			console.log("Turning the " + this.color + " " + this.type + " off...");
		}
	}
});

// In future discussions we'll be talking about various design patterns like the *Decorator Pattern*, which steering could be a prime example of. In this discussion however `Steering` simply has some functionality that we want to mix in, specifically the steering type and turn method.
var Steering = function(steering) {
	// You could perform more specific steering functionality here. If setting the steering property is all that you actually needed to do here then the Steering constructor in a real world example could simply be omited since its sole purpose is to provide mixed in functionality for the `Car` prototype as we'll see in a second.
	this.steering = steering;
};

// The `Steering` prototype
Steering.prototype = {
	steering: "standard", // power steering obviously does not come standard!
	turn: function() {
		console.log(this.steering ? "Turning is a breeze!" : "At least i'm getting by workout in for today!");
	}
};

// Here we'll reintroduce the Car constructor as well as the first bit of our *mixin* functionality. You'll notice that we're using the `Function.call` referencened in the last discussion, but here we're using it twice. Once, for the `Vehicle` functionality and once for our new `Steering` functionality. Following this structure car instances could inherit [mixin] from many different sources.
var Car = function(color, steering) {
	// Like stated a little bit earlier in most cases you didn't have any complex functionality occuring in the `Steering` constructor then it could simply be omitted. I thought it was worth leaving for now because it show how you could potentially have multiple constructors running on the same instance.
	// Try ommitting this code in the [JSBin]() of this discussion and logging out the `Car.prototype`. You'll see that `turn` and `steering` are still referenced (just that no function calls have been called on them).
	Steering.call(this, steering);
	Vehicle.call(this, color);
};

// The 'Car' prototype
Car.prototype = Object.create(Vehicle.prototype, {
	type: { value: "car" },
	windows: { value: 4 },
	rollDownWindows: {
		value: function() {
			console.log("Rolling down " + this.windows + " windows...");
		}
	}
});

// Here we are simply just applying our predifined mixin (above) function to our `Car` constructor. This is a sense adding what you would classify as a static method in other Class based languages. In JavaScript terms we're simply referencing a new method on our `Car` constructor.
Vehicle.mixin = Car.mixin = mixin;

// Mixin the `Steering` prototype with our `Car` prototype
Car.mixin(Steering.prototype);

// Create an instance of the `Car`. Set it's `color` to "blue" (used by the `Vehicle` constructor) and its `steering` to "power" (used by the `Steering` constructor).
var car = new Car("blue","power");

// Perform some functionality on the car instance
car.start(); // Should log `Starting the blue car up...`
car.rollDownWindows(); // Should log `Rolling down 4 windows...`
car.turn(); // Should log `Turning is a breeze!`
car.stop(); // Should log `Turning the blue car off...`

// Very quickly i just wanted to bring a concept up that we'll cover in furture discussion, but is worth noting here. Above when I applied the mixin method to the `Car` constructor I did the same to the `Vehicle` constructor. I think this very adequetly illustrates the power of abstract methods. Abstract in the sense that you would never actually call the `mixin` method on its own like this:

// mixin({ foo:"bar" }); // commented out because it will throw an error

// Because mixin is simply a method that is available (because of the way we wrote it) to be assigned to any constructor it is an *abstract method*. Note how it was applied to both `Vehicle` and `Car`, but will reference different prototypes depending on which is called. This is a great way to avoid duplicating code for functionality that should be available to multiple constructors.

Vehicle.mixin({ foo:"foo" });
Car.mixin({ foo:"bar" });

console.log(Vehicle.prototype.foo); // Should log `foo`
console.log(Car.prototype.foo); // Should log `bar`

// So to wrap up the above example showed a few different concepts:

// 1. Simple mixin functionality for inheriting from more than one source.
// 2. How to run an instance through multiple constructors
// 3. How to write and apply *abstract methods* to constructors


