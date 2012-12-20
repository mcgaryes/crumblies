var util = require('util');
module.exports = {
	log:function(object) { 
		console.log( util.inspect(object, true, null,false) );
	}
}