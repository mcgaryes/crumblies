"use strict";

var _ = require("underscore");
var MonkeyBars = require("monkeybars");

var CreateStringTask = require('./create_string_task').CreateStringTask;
var CreateIntegerTask = require('./inttask').CreateIntegerTask;
var CreateFloatTask = require('./floattask').CreateFloatTask;
var CreateGeoTask = require('./geotask').CreateGeoTask;
var CreateUidTask = require('./create_uid_task').CreateUidTask;
var CreateImageTask = require('./imgtask').CreateImageTask;

var CreateObjectTask = MonkeyBars.ParallelTask.extend({
	name: "CreateObjectTask",
	initialize: function(options) {

		this.name = this.name + " - " + this.options.index;

		var tasks = [];
		var structure = this.options.structure;
		var keys = _.keys(structure);
		var values = _.values(structure);

		_.each(keys, function(key, index) {

			var value = values[index];

			if(_.isString(value)) {

				var parts = value.split("|");
				var type = parts[0];
				var option = parts[1];
				var option2 = parts[2];

				if(type === "int") {

					tasks.push(new CreateIntegerTask({
						"range": option,
						"key": key
					}));

				} else if(type === "string") {

					tasks.push(new CreateStringTask({
						"range": option,
						"key": key
					}));

				} else if(type === "uid") {

					tasks.push(new CreateUidTask({
						"key": key
					}));

				} else if(type === "geo") {

					tasks.push(new CreateGeoTask({
						"key": key
					}));

				} else if(type === "float") {

					tasks.push(new CreateFloatTask({
						"range": option,
						"key": key
					}));

				} else if(type === "img") {

					tasks.push(new CreateImageTask({
						"width": option,
						"height": option2,
						"key": key
					}));

				}

			} else if(_.isObject(value)) {

				tasks.push(new CreateObjectTask({
					structure:value,
					operate:function(data,task){
						console.log(data);
						if(this.data === undefined) {
							this.data = {
								key:key,
								value:{}
							};
						}
						this.data.value[data.key] = data.value;
					}
				}));
			
			} else if(_.isArray(value)) {
			
			
			}

		});

		this.tasks = tasks;
	},
	operate: function(data, task) {
		/*
		if(this.data === undefined) {
			this.data = {};
		}
		this.data[data.key] = data.value;
		*/
	},
	onComplete:function(){
		delete this;
	}
});

exports.CreateObjectTask = CreateObjectTask;