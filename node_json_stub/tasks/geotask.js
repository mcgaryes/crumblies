"use strict";

var _ = require("underscore");
var MonkeyBars = require("monkeybars");

exports.CreateGeoTask = MonkeyBars.Task.extend({
	name:"CreateGeoTask",
	performTask:function() {

		this.complete({
			key:this.options.key,
			value:{
				lat:39.969309,
				long:-83.004284
			}
		});

	}
});