// requires
var _ = require("underscore");

// typical modules non-inheritance
var a = require("./a")(_);
var b = require("./b")(_);

// start the conversation
a.converse (function(){
	b.respond( function () {
		a.respond(b.name);
	}); 
});

// modules that inherit
var C = require("./c")(_);
var D = require("./d")(_);

var instance_c = new C();
var instance_d = new D();

// start the conversation
instance_c.converse (function(){
	instance_d.respond( function () {
	 	instance_c.respond(instance_d.name);
	}); 
});