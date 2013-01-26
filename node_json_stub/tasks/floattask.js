"use strict";

var _ = require("underscore");
var MonkeyBars = require("monkeybars");
var NumberUtils = require("../utils/number_utils");

exports.CreateFloatTask = MonkeyBars.Task.extend({
	name:"CreateIntegerTask",
	performTask:function() {

		var product = 4.2;

		if(!_.isUndefined(this.options.range)){

			var parts = this.options.range.split("-");

			if(parts.length == 1) {

				product = parseFloat(parts[0], 10);

			} else {

				var low = parseFloat(parts[0], 10);
				var high = parseFloat(parts[1], 10);

				product = NumberUtils.getRandomInRange(low,high,3);
			}

		}
		
		this.complete({
			key:this.options.key,
			value:product
		});

	}
});