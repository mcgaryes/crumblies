/*

	This is a very straight forward example of prototypal inheritance. It also demonstrates how
	prototype methods and properties can be overridden to produce different results.

	Developer humor is about to ensue...

*/

var extend = function(attributes) {
	var parent = this;
	var child;

	child = function(){ parent.apply(this, arguments); };

	for(var prop in parent) {
		child[prop] = parent[prop];
	}

	for(var prop in parent.prototype){
		child.prototype[prop] = parent.prototype[prop];
	}

	for(var prop in attributes) {
		child.prototype[prop] = attributes[prop];
	}

	return child;
}

// create ClassA of which everything following will extend
var ClassA = function(attributes){
	for(var prop in attributes) {
		this[prop] = attributes[prop];
	}
}

ClassA.prototype = {
	name:"AbstractClassA",
	sayHello:function() {
		console.log(this.name.toUpperCase() + ": My name is " + this.name + ".");
	},
	politelyRespond:function(name){
		console.log(this.name.toUpperCase() + ": It is very nice to meet you " + name + "!");
	}
};

ClassA.extend = extend;

// create an instance of ClassA
var classA = new ClassA({ name:"A" });

// create ClassB as an extention of ClassA
var ClassB = ClassA.extend();

// create an instance of ClassB
var classB = new ClassB({ name:"B" });

// create ClassC as an extention of ClassB
var ClassC = ClassB.extend({
	sayHello:function(){
		console.log(this.name.toUpperCase() + ": Why am I never included in any of these conversations?");
	},
	leaveConversation:function(){
		console.log(this.name.toUpperCase() + ": I guess ill just " + this.name + " my out of it then.");
	}
});

// create an instance of ClassC
var classC = new ClassC({
	name:"C"
});

// start the conversation
classA.sayHello();
classB.politelyRespond(classA.name);
classB.sayHello();
classA.politelyRespond(classB.name);
classC.sayHello();

// override at run time the default behavior for A and B instances
ClassA.prototype.politelyRespond = ClassB.prototype.politelyRespond = function() { console.log(this.name.toUpperCase() + ": (awkward scilence)"); }

classA.politelyRespond();
classB.politelyRespond();
classC.leaveConversation();






