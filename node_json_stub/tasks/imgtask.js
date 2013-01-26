"use strict";

var _ = require("underscore");
var MonkeyBars = require("monkeybars");
var NumberUtils = require("../utils/number_utils");

exports.CreateImageTask = MonkeyBars.Task.extend({
	name:"CreateImageTask",
	performTask:function() {
		this.complete({
			key:this.options.key,
			value:"http://dummyimage.com/" + randomNum(this.options.width) + "x" + randomNum(this.options.height) + "/000/fff.png"
		});
	}
});

var randomNum = function(range){
	
	var product = 150;

	if(!_.isUndefined(range)){

		var parts = range.split("-");

		if(parts.length == 1) {

			product = parseInt(parts[0], 10);

		} else {

			var low = parseInt(parts[0], 10);
			var high = parseInt(parts[1], 10);

			product = NumberUtils.getRandomInRange(low,high,0);
		}

	}

	return product;
};