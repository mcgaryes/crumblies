"use strict";

var _ = require("underscore");
var MonkeyBars = require("monkeybars");

exports.CreateUidTask = MonkeyBars.Task.extend({
	name:"CreateUidTask",
	performTask:function() {

		var id = GUID();
		this.complete({
			key:this.options.key,
			value:id
		});
	}
});

function GUID ()
{
    var S4 = function ()
    {
        return Math.floor(
                Math.random() * 0x10000 /* 65536 */
            ).toString(16);
    };

    return (
            S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4()
        );
}