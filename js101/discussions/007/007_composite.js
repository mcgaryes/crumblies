"use strict";

// Reference to the namespace we'll be writing our pattern players.
var CompositeDesignPattern = (function() {

	// The View prototype will act as our base object that our composite counterpart will extend.
	var View = function(options) {
		// Apply any options to our instance.
		this.options = options;
		if (this.options && this.options.name) {
			this.name = this.options.name;
		}
	};
	// The view prototype which extend the Object.prototype object.
	View.prototype = Object.create({}, {
		name: {
			value: "view",
			writable: true
		},
		transitionIn: {
			value: function() {
				console.log(this.name + ": transition in");
			}
		},
		transitionOut: {
			value: function() {
				console.log(this.name + ": transition out");
			}
		}
	});
	// Our composite view and prototype. For all intensive purposes a `CompositeView` is a `View` as it extends `View`. Any method or property that exists on `View` will exist on a `CompositeView`. This being said it does differ in one important way, a `CompositeView` can contain other `Views` and `CompositeViews`.
	var CompositeView = function(options) {
		// Composite view specific functionality.
		// Here we're calling the View method and passing the composite view as its context.
		View.call(this, options);
	};
	CompositeView.prototype = Object.create(View.prototype, {
		name: {
			value: "composite-view",
			writable: true
		},
		// This array will be used to hold references to contained `View`'s and `CompositeView`'s.
		subViews: {
			get: function() {
				return this._subViews;
			}
		},
		// Helper method to add subviews to the `CompositeView`
		addSubView: {
			value: function(view) {
				if (this._subViews === undefined) {
					this._subViews = [];
				}
				this._subViews.push(view);
			}
		},
		transitionIn: {
			value: function() {
				View.prototype.transitionIn.call(this);
				for (var i = 0; i < this._subViews.length; i++) {
					var view = this._subViews[i];
					view.transitionIn();
				}
			}
		}
	});
	// return our `CompositeDesignPattern` object for use.
	return {
		View: View,
		CompositeView: CompositeView
	};
}).call(this);

// Creation of our `CompositeView` instance.
var compositeView = new CompositeDesignPattern.CompositeView({
	name: "parent-view"
});
// Creation of our `View` instance
var view = new CompositeDesignPattern.View({
	name: "child-view"
});
compositeView.addSubView(view);
// Should log "child-view" because it is now contained in the `subViews` array on our `CompositeView` instance.
console.log(compositeView.subViews[0].name);
// The power of the pattern comes when you start nesting `CompositeView`s within each other. Here we'll create another `CompositeView` with subviews and add it to our `parentView` `CompositeView` instance.
var subCompositeView = new CompositeDesignPattern.CompositeView({
	name: "composite-child-view"
});
// Lets add some children to our `subCompositeView`, `CompositeView` instance.
for (var i = 0; i < 10; i++) {
	subCompositeView.addSubView(new CompositeDesignPattern.View({
		name: "child-view-" + i
	}));
}
// And finally lets add the `subCompositeView` to our first `CompositeView` instance.
compositeView.addSubView(subCompositeView);
// Because we overwrote the `transitionIn` functionality in the `CompositeView` to transition in all of its subViews, calling `transitionIn` on our `compositeView` `CompositeView` instance will transition everything in.
compositeView.transitionIn();