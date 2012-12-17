module.exports = function(_) {

  var C = function(options) {};

  C.prototype = {
    name: "c",
    sayHello: function() {
      console.log("(C) Hi, my name is " + this.name + ".");
    },
    respond: function(name) {
      console.log("(C) Nice to meet you " + name + ".");
    },
    converse: function(callback) {
      this.sayHello();
      if(callback) callback();
    }
  }

  return C;

};