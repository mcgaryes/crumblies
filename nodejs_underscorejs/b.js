module.exports = function(_) {
	return {
		name: "b",
		sayHello: function() {
			console.log("(B) Hi, my name is b.");
		},
		respond: function(callback) {
			this.sayHello();
			if(callback) callback();
		},
		converse: function(callback) {
			this.sayHello();
		}
	};
}