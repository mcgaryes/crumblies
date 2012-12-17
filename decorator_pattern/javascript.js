// create my class
var Vehicle = function(attributes){
	for(var attribute in attributes) {
		this[attribute] = attributes[attribute];
	}

	if(this.speed == "knots") Boat(this);
	else if (this.speed == "mach") Plane(this);
	else if (this.speed == "mph") Car(this);
}

Vehicle.prototype = {
	countWheels:function(){
		console.log("This vehicle has " + this.numWheels + " wheels.");
	}
}

// decorators
var Car = function(vehicle) { vehicle.numWheels = 4; }
var Plane = function(vehicle){ vehicle.numWheels = 3; }
var Boat = function(vehicle){ vehicle.numWheels = 0; }

// instances
var vehicle1 = new Vehicle({ speed:"knots" });
var vehicle2 = new Vehicle({ speed:"mach" });
var vehicle3 = new Vehicle({ speed:"mph" });

// count wheels
vehicle1.countWheels();
vehicle2.countWheels();
vehicle3.countWheels();