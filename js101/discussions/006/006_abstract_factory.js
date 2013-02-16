"use strict";

// create our namespace that will hold this example and write it to the global object (in the browsers case the `window` object).
var AFE = this.AFE = {};

// for this example we're always going to be creating a type of object based off of this global variable. Whether we create a ConcreateProductA or a ConcreteProductB will be decided in the abstract factory by whether or not this global variable is set to `A` or `B`. This will make more sense as we look at the actual implementation of our `AbstractFactory` object.
var globalVariable = "A";

// one thing to note is that because we are passing object as variable through our concrete and abstract modules the ordering of code needs to be set up in a certain order. This is why the concrete implementation are listed before their abstract implementations. As well as why the abstract products are listed before the abstract factory. If you were using a module loader like say Require, where dependencies are managed by the loader, this would not be nessisary.

// here we create out concrete implementations of our product A and product B objects.
var ConcreteProductA = function(){};
ConcreteProductA.prototype = Object.create({},{
	name:{ 
		value:"ConcreteProductA" 
	}
});

var ConcreteProductB = function(){};
ConcreteProductB.prototype = Object.create({},{
	name:{ 
		value:"ConcreteProductB" 
	}
});

// Here we're creating our abstract product AbstractProductA
var AbstractProductA = (function(Product){
	// the implementation of the AbstractFactory's createProduct method
	var createProduct = function(){
		return new Product();
	};
	// the interface to make available to the AbstractFactory
	return {
		createProduct:createProduct
	};
}).call(AFE,ConcreteProductA);

// Here we're creating our abstract product AbstractProductB
var AbstractProductB = (function(Product){
	// the implementation of the AbstractFactory's createProduct method
	var createProduct = function(){
		return new Product();
	};
	// the interface to make available to the AbstractFactory
	return {
		createProduct:createProduct
	};
}).call(AFE,ConcreteProductB);

// create our abstract factory that will describe functionality to expose to the application
var AbstractFactory = (function(AbstractProductA, AbstractProductB){
	// root is a reference to the context that we passed in through when this self executing module is run
	var root = this;
	// here we are going to be conditionally running either the AbstractProductA's createProduct method or the AbstractProductB's createProduct method based on our globalVariable or the passed type
	var createProduct = function(type){
		var cType = type !== undefined ? type : globalVariable;
		if(cType === "A") {
			return AbstractProductA.createProduct();
		} else if(cType === "B") {
			return AbstractProductB.createProduct();
		}
	}
	// our interface that we're exposing to the rest of the applicaiton
	root.AbstractFactory = {
		createProduct:createProduct
	};
}).call(AFE,AbstractProductA,AbstractProductB);

// now that we have our Abstract Factory pattern in place we simple call the create product method through it and are returned a concrete implementation based on the global variables value.
// We're referencing the AbstractFactory through our namespace because the module purposly doesnt return anything, rather just sets itself on the namespace.
console.log(AFE.AbstractFactory.createProduct().name);

// So why is this pattern important? From this example you could just as easily take the code in the AbstractFactory's createProduct method and place it wherever you needed to create either the concrete product A or B. But say for example that you had more than just A and B, Say you have products that ranged from A to F, and there was more than just one place in your application where you wanted to instantiate these products. Now your duplicating code and have conditional code in multiple places rather than one. Also say that somewhere down the line you needed to add product G and H to the mix. You would essentially have to augment the code in more than one place. 

// The Abstract Factory pattern gives you away to avoid these common problems as well as drastically simplifies the process in which you create concrete products.

