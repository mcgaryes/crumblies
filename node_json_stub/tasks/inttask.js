"use strict";

var _ = require("underscore");
var MonkeyBars = require("monkeybars");
var NumberUtils = require("../utils/number_utils");

exports.CreateIntegerTask = MonkeyBars.Task.extend({
	name:"CreateIntegerTask",
	performTask:function() {

		var product = 42;

		if(!_.isUndefined(this.options.range)){

			var parts = this.options.range.split("-");

			if(parts.length == 1) {

				product = parseInt(parts[0], 10);

			} else {

				var low = parseInt(parts[0], 10);
				var high = parseInt(parts[1], 10);

				product = NumberUtils.getRandomInRange(low,high,0);
			}

		}
		
		this.complete({
			key:this.options.key,
			value:product
		});
	}
});