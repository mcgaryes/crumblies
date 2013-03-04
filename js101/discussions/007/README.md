# Discussion 007 - Composite Design Pattern

### Overview

The composite pattern describes a structure where groups of objects (compositions) and single instances of objects can be treated uniformly. It's intent is to give the software the ability to 'composite' objects into structures that represent part-whole hierarchies.

In this discussion we're going to look at an example that uses hypothetical view objects. There are two main players in this example.
* `View` - Our base view that contains functionality like transitionIn/Out
* `CompositeView` - An object that inherits from `View` but adds functionality to help manage subviews (composition).

### Discussion Questions

* What other common pieces of applications could benefit from such a pattern?
* When do you think objects become too separated in functionality to benefit from the composite pattern?

### Resources

* [Annotated Source Code](http://emcgary.r1l4b.com/discussions/007_composite.html)
* [GitHub](https://github.com/mcgaryes/crumblies/blob/master/js101/discussions/007/)
* [JSBin](http://jsbin.com/ijaguy/2/edit)