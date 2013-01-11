"use strict";

// The vehicle contructor. The constructor is a bit different than it was presented in [disucssion one](/). We'll be using a single argument of type `Object` which will give us the ability to easily add new options in future development.
var Vehicle = function(options) {
	if(options !== undefined) {
		for(var prop in options) {
			// @TODO: talk about why we're checking this how we are here
			if(options.hasOwnProperty(prop)){
				this[prop] = options[prop];
			}
		}
	}
};

// The vehicle prototype. Here, unlike in disucssion one we'll be using the `Object.create` method which enables us to easily extend one object with another. Because this is our *base* object for all vehicles the `Vehicle` prototype will just simply be extending an empty [object literal](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Values,_variables,_and_literals#Object_literals).
//
// @TODO: mention that this is not supported for certain processes
Vehicle.prototype = Object.create({},{
	// @TODO: talk about why we're setting the variable like this here?
	// @TODO. list where you can read more about the settings available here
	// @TODO: overwrite type here as a getter
	type:{
		value:"vehicle",
		writable:true
	},
	color:{
		value:"grey",
		writable:true
	},
	startUp:{
		value:function(){
			console.log("Starting the " + this.color + " " + this.type + " up...");
		},
		writable:true
	},
	drive:{
		value:function(distance){
			this.startUp();
			console.log("Driving the " + this.color + " " + this.type + " for " + distance);
		},
		writable:true
	},
	shutDown:{
		value:function(){
			console.log("Shutting the " + this.color + " " + this.type + " down...");
		},
		writable:true
	}
});

// @TODO: descibe the car constructor
var Car = function(options) {
	// @TODO: talk about why we reference through `this` this way
	this.type = "car";
	// @TODO: describe why we're calling the `Vehicle` constructor like this
	Vehicle.call(this,options);
}

// @TODO: talk about why we're extending this way and why we're passing `Vehicle.prototype`
Car.prototype = Object.create(Vehicle.prototype,{
	// @TODO: overwrite type here as a getter
	turn:{
		value:function(direction){
			console.log("The " + this.color + " " + this.type + "'s turn signal shows " + direction + "...");
		},
		writable:true
	}
});

// @TODO: metion about the instance
var car = new Car({
	color:"red"
});

// @TODO: explain why this is important
car.drive("100 miles");
car.turn("left");
car.shutDown();

// @TODO: possibly create like a boat vehicle... think about what is different for the two types car vs boat