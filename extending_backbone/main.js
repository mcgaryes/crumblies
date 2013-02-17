// ==================================================================
// === Extention ====================================================
// ==================================================================

// our backbone extended functionality
var AbstractBaseView = (function() {

	var BaseView = Backbone.View.extend({

		/**
		 * Creates an empty array where subview references can be push for later use.
		 * @method initialize
		 */
		initialize: function() {
			this.subViews = [];
		},

		/**
		 * Adds a sub view to a container BaseView
		 * @method addSubView
		 * @param {BaseView} view
		 */
		addSubView: function(view) {
			// only add views that extend Backbone.BaseView (our extention of the framework)
			if(!_.isFunction(view.addSubView)) {
				throw "'view' is not a extention of BaseView";
			}
			this.subViews.push(view);
			view.parent = this;
			var delegate = this;
			view.render(function(el) {
				delegate.$el.append(el);
			});
		},

		/**
		 * Removes a sub view from the container view
		 * @method removeSubView
		 * @param {Object} view A base view or a cid of the sub view
		 */
		removeSubView: function(view) {
			// assuming that what was passed was not an actual view and in fact was a cid
			if(!view.cid) {
				view = _.where(this.subViews, {
					cid: view
				});
			}
			Backbone.BaseView.prototype.destroy.call(view,true);
			this.subViews = _.reject(this.subViews, function(subView) {
				return subView.cid == view.cid;
			});
		},

		/**
		 * This method is a great helper method to call when the subclass view is about to be removed.
		 * It recursively will call destroy on any subviews reference in the sub views array. It also handles
		 * removing any event listeners that may have been added to the subViews array.
		 * @method destroy
		 */
		destroy: function(force) {
			
			if(!_.isUndefined(this.parent) && !_.isBoolean(force)) {
				this.parent.removeSubView(this);
				return false;
			}

			// recursively destroy sub views
			if(this.subViews.length > 0) {
				_.each(this.subViews, function(view) {
					view.destroy();
				});
			}

			// destroy this view
			this.off();
			this.$el.off();
			this.remove();
			this.subViews = [];
		},

		/**
		 * For instances that are used in dependency routing the render method is called
		 * and used directly after loading. For all other uses you must call render manually.
		 * @method render
		 * @param {Function} callback
		 */
		render: function(callback) {
			throw "This method needs overriden";
		},

		/**
		 * Transitions in the view. By default this method actually does nothing.
		 * @method transitionIn
		 * @param {Function} callback
		 */
		transitionIn: function(callback,context) {
			if(_.isFunction(callback)) {
				callback.call(context ? context : this);
			}
		},

		/**
		 * Transitions out the view. By default this method actually does nothing.
		 * @method transitionOut
		 * @param {Function} callback
		 */
		transitionOut: function(callback,context) {
			if(_.isFunction(callback)) {
				callback.call(context ? context : this);
			}
		}
	});

	Backbone.BaseView = BaseView;
}).call(Backbone);

// ==================================================================
// === Implementation ===============================================
// ==================================================================

// describe our main holder baseview extention
var CustomView = Backbone.BaseView.extend({
	el: function() {
		return $("#" + this.id);
	},
	id: "container",
	tagName: "ul",
	render: function(callback) {
		return this;
	}
});

// describe our holder sub view baseview extention
var CustomSubView = Backbone.BaseView.extend({
	tagName: "li",
	events: {
		"click": "destroy"
	},
	render: function(callback) {
		this.$el.append("<a class='remove' href='#'>" + this.cid + "</a>");
		callback(this.el);
		return this;
	},
	transitionIn:function(){
		this.$el.css("opacity", 0);
        this.$el.fadeTo(350, 1);
	},
	transitionOut:function(callback){
		var delegate = this;
		this.$el.animate({
			"opacity":0,
			"height":0
		},150,function(){
			callback.call(delegate);
		});
	},
	destroy:function(){
		this.transitionOut(function(){
			Backbone.BaseView.prototype.destroy.call(this);
		},this);
		return false;
	}
});

var cv;

$(function() {

	cv = new CustomView();
	cv.render();

	create();

});

function create() {
	if($("#container").length === 0) {
		$("body").append("<ul id='container'></ul>");
		cv = new CustomView();
		cv.render();
	}
	for(var i = 0; i < 10; i++) {
		var csv = new CustomSubView();
		cv.addSubView(csv);
		csv.transitionIn();
	}
}

function destroy() {
	cv.destroy();
}