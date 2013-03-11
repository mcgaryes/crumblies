# Discussion 008 - Decorator Pattern

### Overview

The decorator pattern is a structural design pattern that allows behavior to be added to an individual object. Behaviors can be added in a number of ways, both statically or dynamically, and this should all be done without affecting the behavior of other objects that inherit from the same Object.

In this discussion we'll be using the deocorator pattern to apply behaviors and attributes to a `Car` instance. We'll have decorators to optionally add power windows, add keyless entry and one to make the car an automatic vs manual. Each of these decorators will be passed a single argument, the `Car` instance in which they are wanting to decorate. This would be demonstating an example of how to statically apply deocorations (depending on what your definition of static may be).

### Further Reading

* What are some other examples that you could see the decorator pattern being benificial for?

### Resources

* [Annotated Source Code](http://emcgary.r1l4b.com/discussions/008_decorator.html)
* [GitHub](https://github.com/mcgaryes/crumblies/blob/master/js101/discussions/008/)
* [JSBin](http://jsbin.com/udafag/1/edit)