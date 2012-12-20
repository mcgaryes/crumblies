"use strict";

var C = require('./logger');

var ClassA = function(attributes){
	if(attributes) this.name = attributes.name;
}

ClassA.prototype = Object.create({},{
	name:{ 
		value:"AbstractClassA",
		writable:true
	},
	sayHello:{ value:function(){ console.log("hello"); } }
});

var classA = new ClassA();
classA.sayHello();

var ClassB = function(attributes) {
	/* ... */
  	ClassA.call(this); //call super constructor.
}

ClassB.prototype = Object.create(ClassA.prototype,{
	name:{ 
		value:"AbstractClassB"	
	}
});

var ClassC = function(){
  	ClassB.call(this); //call super constructor.
}

ClassC.prototype = Object.create(ClassB.prototype,{
	name:{ 
		value:"AbstractClassC",
		writable:false 
	}
});

var instance = new ClassC();
instance.sayHello();
instance.name = "another";
console.log(instance.name);
