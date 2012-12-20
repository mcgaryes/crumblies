"use strict";

var Vehicle = function(attrs){
	for(var attr in attrs) {
		this[attr] = attrs[attr];
	}
};

Vehicle.prototype = Object.create({},{
	type:{
		value:"Vehicle",
		writeable:true
	},
	startUp:{
		value:function(){
			console.log("Starting the " + this.type + " up...");
		},
		writeable:true
	},
	drive:{
		value:function(distance){
			console.log("Driving the " + this.type + " for " + ( distance ? distance : 0 ) );
		},
		writeable:true
	},
	shutDown:{
		value:function(){
			console.log("Shutting the " + this.type + " down...");
		},
		writeable:true
	}
});

var Car = function(attrs){
	Vehicle.call(this,attrs);
};

Car.prototype = Object.create(Vehicle.prototype,{
	type:{
		value:"Car"
	},
	startUp:{
		value:function(){
			for(var i = 0;i<2;i++){
				if(i === 0){
					console.log("That didn't work lets try again...");
				} else if (i === 1) {
					Vehicle.prototype.startUp.call(this);
				}
			}
		}
	}
});

var vehicle = new Vehicle();
vehicle.startUp();
vehicle.drive("100 something");
vehicle.shutDown();

var car = new Car();
car.startUp();
car.drive("100 miles");
car.shutDown();