var C = require('./logger');

// create ClassA
var ClassA = {
	name: "AbstractA",
	create:function(){
		C.log(this);
		return this;
	},
	extend: function(attributes) {
		// create the object 
		var object = {};
		// mixin
		for (var property in this) object[property] = { value: this[property] };
		// apply the passed properties
		for(var attribute in attributes) object[attribute] = { value: attributes[attribute] };
		// return the object
		return Object.create(this, object);
	}
}

// create ClassB
var ClassB = ClassA.extend({
	name: "AbstractB",
	sayHello:function(){
		console.log("Hi!");
	}
});

// create ClassC
var ClassC = ClassB.extend({
	name: "AbstractC",
	sayHello:function(){
		console.log("Hi, my name is " + this.name);
	},
	respond:function(){
		console.log("Nice to meet you!")
	}
});

// create an instance of class C
var instance = ClassC.extend({
	name:"instanceC"
});

instance.sayHello();
