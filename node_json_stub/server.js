/*
 *
 * Example URL:
 * http://localhost:8888/?root=data&length=10&structure={key1:Number}
 *
 * @param {String} root			The root node to wrap all data in
 * @param {Integer) length		The number of nodes wanted
 * @param {Object} structure	The generic structure of each node
 *
 */

"use strict";

// requires
var Http = require('http');
var Url = require('url');
var _ = require('underscore');
var MonkeyBars = require('monkeybars');
var CreateObjectTask = require('./tasks/create_object_task').CreateObjectTask;

// constants
var PORT = 8888;
var HOST = "localhost";
var WHITELIST = ["length", "structure", "root"];

// create our http server
var server = Http.createServer(function(req, res) {

	if(req.url.match(".ico")) {
		res.end();
		return;
	}

	var url = req.url;
	var parts = Url.parse(url, true);
	var options = parts.query;

	res.writeHead(200, ['Content-Type', 'application/json']);

	var count = options.count ? parseInt(options.count, 10) : 1;

	// create the parallel task we'll be using for the creation of the json
	var group = new MonkeyBars.ParallelTask({
		//logLevel: MonkeyBars.LogLevels.Verbose,
		onComplete: function() {
			// wrap in root if needed
			var root = options.root;
			if(root) {
				var temp = {};
				temp[root] = this.data;
				this.data = temp;
			}

			console.log(this.data);

			//res.write(JSON.stringify(this.data));
			res.end();
		},
		/*
		operate: function(data,task) {
			console.log(data);
			if(count > 1) {
				if(this.data === undefined) {
					this.data = [];
				}
				this.data.push(data);
			} else {
				this.data = data;
			}
		},
		*/
		onFault: function(error) {
			// throw a 404
			res.end();
		}
	});

	// if we dont have a structure go ahead and fault because there is
	// nothing that we can create
	if(options.structure === undefined) {
		group.fault();
		return;
	}

	// create our tasks
	var structure = JSON.parse(options.structure);
	var tasks = [];
	for(var i = 0; i < count; i++) {
		var task = new CreateObjectTask({structure:structure,index:i});
		tasks.push(task);
	}

	// set the groups tasks and start it up
	group.tasks = tasks;
	group.start();

});

// server.listen(port, [hostname], [backlog], [callback])
server.listen(PORT, HOST, "./server.backlog", function() {
	console.log("Server is now running at " + HOST + ":" + PORT + ".");
});