// mixin functionality
function mixin(destination, source) {
	for (var k in source) {
		if (!destination.hasOwnProperty(k)) {
			destination[k] = source[k];
		}
	}
	return destination; 
}

// create Item class
var Item = function(attributes){
	for(var attribute in attributes) this[attribute] = attributes[attribute];
}

// create the Item's prototype
Item.prototype = {
	name:"AbstractItem",
	sayHello:function(){
		console.log("Hello, my name is " + this.name);
	}
}

// create Group class which in itself is inherently an Item
var Group = function(attributes){
	// need to mix the Group's prototype with the Item's prototype
	for(var attribute in attributes) this[attribute] = attributes[attribute];
}

// create Group's prototype
Group.prototype = mixin({
	itemsSayHello:function(){
		for(var i=0;i<this.items.length;i++){
			this.items[i].sayHello();
		}
	}
},Item.prototype);

// create and Item instance and run functionality
var item = new Item({ name: "ConcreateItem" });
item.sayHello();

// create a Group instance and run functionality on it and its objects
var group = new Group({ 
	name:"ConcreteGroup",
	items:[
		new Item({ name: "ConcreateItemA" }),
		new Item({ name: "ConcreateItemB" })
	]
});
group.sayHello();
group.itemsSayHello();