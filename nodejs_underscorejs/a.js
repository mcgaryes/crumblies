module.exports = function(_) {
	return {
		name: "a",
		sayHello: function() {
			console.log("(A) Hi, my name is a.");
		},
		respond: function(name) {
			console.log("(A) Nice to meet you " + name + ".");
		},
		converse: function(callback) {
			this.sayHello();
			if(callback) callback();
		}
	};
};