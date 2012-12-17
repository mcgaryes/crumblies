// requires

var c = require("./c");

module.exports = function(_) {

	var D = function(options) {};

	D.prototype = {
		name: "d",
		sayHello: function() {
			console.log("(D) Hi, my name is " + this.name + ".");
		},
		respond: function(callback) {
			console.log("(D) Nice to meet you " + this.name + ".");
			if(callback) callback();
		},
		converse: function(callback) {
			this.sayHello();
			if(callback) callback();
		}
	}

	return D;
};