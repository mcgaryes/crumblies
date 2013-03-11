"use strict";

// So here we're going to basically create our base class. This is primarily just to illustrate the clear difference between inheritance and decoration. Our `Car` prototype that we'll define later will inherit from the `Vehicle` prototype and then we'll be decorating it.
var Vehicle = function(protoProps){
	if(protoProps.color) {
		this.color = protoProps.color;
	}
};

// The Vehicle's simple prototype object that makes every inheriting object grey by default.
Vehicle.prototype = {
	color:"grey"
};

// In this discussion we'll be creating decorators that we'll apply to our `Car` instance. One decorator to optionally add power windows, one for keyless entry and one to make the car an automatic. Each of these is passed a single argument which is the `Car` instance that we are wanting to decorate.

// You may be asking yourself, why not just create new prototype/constructor pairs for each of the different options. For instance we could have a prototype called CarWithPowerWindows or CarWithKeylessEntry. This may work in simple cases, but what happens when you want a car with both power windows and keyless entry? You'd end up writing an object like CarWithPowerWindowAndKeylessEntry. Say we wanted to add an automatic transmission into the mix... CarWithPowerWindowAndKeylessEntryAndAutomaticTransmission :( Things can escalate quite quickly!

// **Enter the Decorator pattern...** 

// Instead of inheritance we can assign different properties and actions through decorator methods.

// So with this in mind lets write our Car prototype. This prototype is a bit more robust than you could potentially need, but by adding the second property, `decorators`, an array of decorations to apply to the instance, you can quickly iterate and add listed decorations to an instance.

var Car = function(protoProps,decorators){
	
	// Here we're essentially calling the Vehicle constructor and passing our protoProps
	Vehicle.call(this,protoProps);
	
	// And here we're itterating over the passed decorators and applying them to the instance
	for (var i = 0; i < decorators.length; i++) {
		var method = this[decorators[i]];
	
		// This should pretty self explanatory, but what we're essentially doing here is checking to see if the current item being iterated over is in fact a method on our instance's prototype object. If it is then we're calling it and setting its context to the current instance.
		if(typeof(method) == "function") {
			method.call(this);
		}
	}
};

Car.prototype = Object.create(Vehicle.prototype,{
	price:{
		value:16000,
		writable:true
	},
	// Each of the decorator essentially just call our decorator function that we define later in the code.
	addPowerWindows:{
		value:function(){
			PowerWindows(this);
		}
	},
	addKeylessEntry:{
		value:function(){
			KeylessEntry(this);
		}
	},
	addAutomaticTransmission:{
		value:function(){
			AutomaticTransmission(this);
		}
	}
});

// Finally we actually define our decorator functions. In a more complicated decorator you could potentially use the function as a constructor that has a specific prototype, but in our case we're performing some pretty simple logic so we'll emit this step.

// Each decorator sets a boolean on the instance, adds a reference to an array on the instance, and increments the sticker price of the car.

var PowerWindows = function(car){
	car.powerWindows = true;
	car.price += 750;
	if(car.options === undefined) {
		car.options = [];
	}
	car.options.push("power-windows");
};

// KeylessEntry decorator
var KeylessEntry = function(car){
	car.keylessEntry = true;
	car.price += 625;
	if(car.options === undefined) {
		car.options = [];
	}
	car.options.push("keyless-entry");
};

// AutomaticTransmission decorator
var AutomaticTransmission = function(car){
	car.automaticTransmission = true;
	car.price += 2595;
	if(car.options === undefined) {
		car.options = [];
	}
	car.options.push("automatic-transmission");
};

// And finally we'll create an instance of the car and apply all three available decorators.
var car = new Car({ color:"red" },["addPowerWindows","addKeylessEntry","addAutomaticTransmission"]);

// Should log `[ 'power-windows', 'keyless-entry', 'automatic-transmission' ]`
console.log(car.options);