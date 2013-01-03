"use strict";
// Here we create our `Vehicle` constructor and give it a single argument of `color`. You can reference as many arguments as you'd like here. I find that having a single argument of type `Object` is easier to read and more flexible later if you decide that you need to pass another piece of information to the Constructor. However, to keep it simple, we'll be passing a single `String` argument of `color`.
var Vehicle = function(color) {
	// When we use the keyword `this` from within a constructor, the `this` is a reference to the instance that we are creating. Here we are saying that the instance we are creating should be the color of what has been passed as then color argument.
	if(color !== undefined) {
		this.color = color;
	}
};
// Every Constructor has a prototype assigned to it whether manually set or not. Take for example the function `var F = function(){};`. Even though we dont specifically set `F`'s prototype object, an empty one is still created for it. 
// A constructor's prototype is simply a JavaScript `Object`. This object however is differnt in the sense that when assigned to a constructor is by default available to any instance created with the `new` function call.
// For the `Vehicle`'s constructor however we have some very specific functionality that we what each instance to have when created. Each vehicle should be able to `startUp`, `drive` and `shutDown`. Also each vehicle by default should be of type `Vehicle` and of color `grey` *(if no color is passed)*.
Vehicle.prototype = {
	type:"vehicle",
	color:"grey",
	startUp:function(){
		// One thing to note here is the use of the `this` keyword. You may be thinking that using `this` here would be in reference to the `Vehicle.prototype` object, and this would be correct. However when you create an instance of `Vehicle` and call the `startUp` method on it, the `this` keyword would be in reference to the instance and not to the `Vehicle.prototype` object anymore. 
		console.log("Starting the " + this.color + " " + this.type + " up...");
	},
	drive:function(distance){
		console.log("Driving the " + this.color + " " + this.type + " for " + distance);
	},
	shutDown:function(){
		console.log("Shutting the " + this.color + " " + this.type + " down...");
	}
};
// So now that we have both a constructor and an associated prototype for that constructor we can begin to create new instances containing its default functionality.
// Here we are going to create an instance of a `Vehicle` and make its color red. Because we used the `new` keyword and we associated a prototype object for `Vehicle` any methods we wrote there will now be available to our new instance. Notice that now any reference to `this.color` within the `Vehicle.prototype` methods will now return *red*.
var vehicle = new Vehicle("red");
// logs out *Starting the red Vehicle up...*
vehicle.startUp();
// logs out *Driving the red Vehicle for 100...*
vehicle.drive(100);
// logs out *Shutting the red Vehicle down...*
vehicle.shutDown();
// And to illustrate that every instance created with the Vehicle constructor can have its own color, we'll create a second instance and assign the vehicle's color to blue.
var vehicle2 = new Vehicle("blue");
// logs out *Starting the blue Vehicle up...*
vehicle.startUp();
// logs out *Driving the blue Vehicle for 50...*
vehicle.drive(50);
// logs out *Shutting the blue Vehicle down...*
vehicle.shutDown();
// If you didn't pass a color when creating an instance of a `Vehicle` then any reference to `this.color` from within any of the `Vehicle.prototype` methods would return the prototype's value for `color`. In this example that would be a value of `grey`.
var vehicle3 = new Vehicle();
// logs out *grey*
console.log(vehicle3.color);
