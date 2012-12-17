// ============================================================
// === Helper Methods =========================================
// ============================================================

// mixin functionality
var mixin = function(destination, source) {
	for (var k in source) {
		if (!destination.hasOwnProperty(k)) {
			destination[k] = source[k];
		}
	}
	return destination; 
}

var extend = function(attributes,options){
	var parent = this;
	var child;
	child = function(){ parent.apply(this, arguments); };
	child.prototype = mixin(attributes,parent.prototype);
	return child;
}

// ============================================================
// === Class Construction =====================================
// ============================================================

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
		if(!this.items)
		{
			console.log("I dont have any items");
			return;
		}
		for(var i=0;i<this.items.length;i++){
			this.items[i].sayHello();
		}
	}
},Item.prototype);

// create InheritedGroup
var InheritedGroup = function(attributes){
	// need to mix the Group's prototype with the Item's prototype
	for(var attribute in attributes) this[attribute] = attributes[attribute];
}

// create Group's prototype
InheritedGroup.prototype = mixin({
	itemsSayHello:function(){
		console.log("no");
	}
},Group.prototype);

// copy the extend functionality onto the Item and Group constructors
Item.extend = Group.extend = InheritedGroup.extend = extend;

// create a custom extention of InheritedGroup
var InheritedGroupExtention = Group.extend({
	sayHelloThreeTimes:function(){
		for (var i = 0; i < 3; i++) this.sayHello();
	}
});

// ============================================================
// === Instantiation ==========================================
// ============================================================

// create an Item instance
var item = new Item({ name:"item" });
item.sayHello();

// create a Group instance
var group = new Group({ name:"group", items:[ new Item({ name:"group_item" }) ] });
group.sayHello();
group.itemsSayHello();

// create a InheritedGroup instance
var inheritedGroup = new InheritedGroup({ name:"InheritedGroup" });
inheritedGroup.sayHello();
inheritedGroup.itemsSayHello();

// create an InheritedGroupExtention instance
var groupExtention = new InheritedGroupExtention({ name:"groupExtention" });
groupExtention.itemsSayHello();
groupExtention.sayHelloThreeTimes();