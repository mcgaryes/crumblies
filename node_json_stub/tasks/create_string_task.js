"use strict";

var _ = require("underscore");
var MonkeyBars = require("monkeybars");
var COPY = "Nam sagittis mauris eu lectus commodo in viverra nulla dapibus. Nulla et eros et ante mattis tempor. Aliquam luctus, velit nec suscipit lobortis, eros eros varius turpis, nec lacinia quam libero in elit. Donec gravida lacus ipsum, ut tincidunt odio. Quisque lectus massa, sodales ac consequat quis, malesuada vitae lacus. Donec sollicitudin cursus arcu, in vulputate felis feugiat at. Duis a turpis eget quam pulvinar sodales a quis erat. Morbi ullamcorper tristique ipsum quis vestibulum. Etiam sodales consequat turpis a vehicula. Donec at tortor sapien. Quisque eu massa libero. In volutpat faucibus libero, quis euismod purus porttitor et. Integer tincidunt pulvinar vehicula. Curabitur sodales placerat purus a cursus. Maecenas laoreet volutpat mi sed hendrerit. In consequat, magna at suscipit pharetra, dolor neque luctus diam, non vehicula massa lorem tempor ipsum. Maecenas posuere varius felis non fermentum. Ut sem metus, pretium quis accumsan in, pulvinar vitae massa vestibulum ante ips.";

exports.CreateStringTask = MonkeyBars.Task.extend({
	name:"CreateStringTask",
	performTask:function() {
		
		var range = this.options.range;
		var parts = range.split("-");
		var low = parseInt(parts[0], 10);
		var high = parseInt(parts[1], 10);
		var random = Math.floor(Math.random() * high) + low;
		if(random > 1000) {
			random = 1000;
		}
		
		this.complete({
			key:this.options.key,
			value:COPY.substr(0,random)
		});

	}
});