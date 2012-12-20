// # Live Code View #
// **http://jsbin.com/acuxef/2/edit**

// JavaScript uses prototypes instead of classes for inheritance. It is possible to simulate many class-based features with prototypes in JavaScript. 

// Functions double as object constructors along with their typical role. Prefixing a function call with `new` creates a new object and makes available any proertys on the constructors prototype object.

// In this lesson we're going to look at an example, however contrived, of the constructor/prototype relationship in order to better understand how inheritence works with multiple instances of a prototype.

"use strict";

// Like stated above, constructors (functions) and be associated with a object. Here we create our `Vehicle` constructor and give it a single argument of `attributes`. Depending on how many arguments you think you'll pass when instantiating a `Vehicle` object you can reference as many arguments as you'd like here. I find that having a single argument of type `Object` is easier to read and more flexible later if you decide that you need to pass another object to the Constructor.
var Vehicle = function(attributes){
	
	// When we use the keyword `this` from within a constructor, the `this` is a reference to the instance that we are creating. Here we are saying that the instance we are creating is of type **Vehicle**.
	this.type = "Vehicle";

	// Here we will be applying all of the passed attributes to the Vehicle instance. If there were attributes passed and the attributes object has a property `color` available on it then we are going to set the instances `color` to the passed `color`.
	if(attributes && attributes.color) {
		this.color = attributes.color;
	}
};

// Every constructor has a prototype assigned to it whether you specifically set it or not. Take for example the function `var F = function(){};`. Even though we dont specifically set `F`'s prototype object, an empty one is still written for it. 

// A constructor's prototype is simply a JavaScript `Object`. This object however is differnt in the sense that when assigned to a constructor is is by default available to any instances created with a `new` function call.

// For the `Vehicle`'s constructor however we have some very specific functionality that we what each instance to have. Each vehicle should be able to `startUp`, `drive` and `shutDown`. 
Vehicle.prototype = {
	color:"none",
	startUp:function(){
		// One thing to note here is the use of the `this` keyword. You may be thinking that using `this` here would be in reference to the `Vehicle.prototype` object, and this would be correct. However after you create an instance of `Vehicle` and call the `startUp` method on it, the `this` keyword would be in reference to the instance and not the `Vehicle.prototype` anymore. 
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

// Here we are going to create an instance of a `Vehicle` and make its color red. Because we used the `new` keyword and we associated a prototype object wit `Vehicle` any methods we wrote there will now be available to our new instance. Notice that now any reference to `this.color` within `Vehicle.prototype` will now return *red*.
var vehicle = new Vehicle({ 
	color:"red" 
});
// logs out *Starting the red Vehicle up...*
vehicle.startUp();
// logs out *Driving the red Vehicle for 100...*
vehicle.drive(100);
// logs out *Shutting the red Vehicle down...*
vehicle.shutDown();

// And to illustrate that every instance created with the Vehicle constructor can have its own implementation of its attributes we'll create a second instance. However here we will assign the vehicle's color to blue. This is an important thing to understand. Even though the `Vehicle.prototype`'s `startUp`, `drive` and `shutDown` reference this.color, each instance has assigned its own color...
var vehicle2 = new Vehicle({ 
	color:"blue" 
});
// logs out *Starting the blue Vehicle up...*
vehicle.startUp();
// logs out *Driving the blue Vehicle for 50...*
vehicle.drive(50);
// logs out *Shutting the blue Vehicle down...*
vehicle.shutDown();

// ... if you were not to assign any color when creating an instance of Vehicle then any reference to `this.color` from within any of the `Vehicle.prototype` methods would return the prototypes value for color. In this example that would be a value of `none`.
var vehicle3 = new Vehicle();
// logs out *none*
console.log(vehicle3.color);
