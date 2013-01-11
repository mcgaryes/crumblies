/*global console:false */

"use strict";

// The vehicle contructor.

var Vehicle = function(color) {
	if(color !== undefined) {
		this.color = color;
	}
};

// The vehicle prototype, unlike in disucssion one uses the `Object.create` method which gives us to ability to easily extend one object with another.

// While the `Object.create` saves us from having to write our own implementation for creating a new object as an extention of another certain browsers are not supported. You can see support metrics [here](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create).

Vehicle.prototype = Object.create({},{
	
	// It's worth noting that prototype properties added via `Object.create` have to be written in a certain manner.
	
	type:{
		
		// 'get' is known as a property descriptor. There are four types of property descriptors. 'get', 'set', 'value', 'configuable', 'writable' and `enumerable`. I won't go into to much detail about what all of these property descriptors do, but if you're interested you can read more about them [here](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty).

		// All you need to know for this *discussion* is that when i access the type of a Vehicle instance with `instance.type` it will return "vehicle".

		get:function(){
			return "vehicle";
		}

	},
	color:{
		value:"grey",
		writable:true
	},
	travel:{
		value:function(){
			console.log("I haven't been told how to!");
		},
		writable:true
	}
});

// Here we're creating a `Car` constructor just like we did with the `Vehicle` constructor

var Car = function(color) {

	// `Vehicle.call` might look a little foriegn to those not familiar with the various native methods available to JavaScript Functions.
	
	// The `call` method calls (executes) a method of another object in the context of a different object (the calling object).Arguments can be passed as they are.
	
	// So here we are simply calling the `Vehicle` Constructor and passing the `Car` instance we're creating as the new context `Vehicle` should use.
	
	// If you want to read more about the native `call` method you can do so [here](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/call). Although this is the extent in which we'll be using it in this *discussion*.
	
	Vehicle.call(this,color);

};

// Now to **extending prototypes**! Here we're again using `Object.create` to create a new object that will act as the `Car`'s prototype. However here we're passing our previously defined `Vehicle.prototype` as its initial object to extend.

Car.prototype = Object.create(Vehicle.prototype,{
	
	// Here we're overwriting the type property and its descriptors to reflect a `type` of "car"
	type:{
		get:function(){
			return "car";
		}
	},
	
	// Override the `travel` method of the `Vehicle.prototype` so that the `Car` instances know how to travel

	travel:{
		value:function() {
			console.log("The " + this.color + " " + this.type + " takes to the open highway.");
		},
		writable:true
	}
});

var Boat = function(name,color){
	this.name = name;
	Vehicle.call(this,color);
};

Boat.prototype = Object.create(Vehicle.prototype,{
	
	// Here we're overwriting the type property and its descriptors to reflect a `type` of "boat"
	type:{
		get:function(){
			return "boat";
		}
	},

	// People like to name their boats !!!!
	
	name:{
		value:"boat",
		writable:true
	},
	travel:{
		value:function() {
			console.log("'" + this.name + "', which is a " + this.color + " " + this.type + ", sails the ocean blue.");
		},
		writable:true
	}
});


// Here we'll create some new instances of both our `Car` and `Boat` prototypes. Notice that when we wrote Constructors for each that we never actually told them how to handle the color argument, but since we ran the `Vehicle`'s Constructor method from within color is still applied.

var car = new Car("red");
var boat = new Boat("The Cod Father","white");

// Because we've overridden the `travel` method for both of the vehicle types they will now produce differnt outcomes.

// should log `The red car takes to the open highway.`

car.travel();

// should log `The Cod Father, which is a white boat, sails the ocean blue.`

boat.travel();

// Note that you can still create an instance of `Vehicle`, but because we haven't written any specific functionality on how it should `travel` it won't actually know how to.

var vehicle = new Vehicle();

// should log `I haven't been told how to!`

vehicle.travel();

