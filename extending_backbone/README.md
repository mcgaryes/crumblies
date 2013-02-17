### Extending Backbone

I was curious after looking into Backbone.Marionette how you could potentially leverage the simplicity of Backbone by extending the core functionality. This little snippet is basically creating a composite view (view's that can contain sub views) that has default methods like transitionIn/Out, destroy, add/removeSubView, etc.

The main thing i took away from the implementation is that yes, while backbone is has less built in functionality than say, ember, it's very easy to extend the base functionality to accomplish everything your setting out to do. This little extention of Backbone took me only an hour to write and now I have a starting point for more complex views moving forward.