# Discussion 006 - Abstract Factory

### Overview

As described in the *Gang Of Four* book, the Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes (or in JavaScripts case Objects).

So what does this actually mean? Well to understand just exactly this means we'll have to look at the individual components that go into setting up an Abstract Factory pattern. Like a basketball team, the individual players make up an whole team.

So these are your players...

* AbstractFactory
	* The abstract factory declares an interface with methods to create abstract product objects. For instance say you had an application that created social network items that could either be Twitter or Facebook tweets or posts. The AbstractFactory could contain a method called 'createSocialItem' that would simply return either a tweet or a post, depending on which type was last recieved. 
* ConcreteFactory
	* A ConcreteFactory in the Abstract Factory pattern implements the same functionality that the AbstractFactory describes, but not as an interface would. These objects would actually implement the functionality rather than just describe it. So keeping with the tweet/post example from before, this object would actually preform the code that would check which social network has the most recent post and grab and create it to return to the initial caller.
* AbstractProduct
	* I see this part of the Abstract Factory pattern to be optional depending on the complexity of your implementation. However the AbstractProduct describes an interface in which you can describe the functionality of the eventual concrete implementation of the product.
* ConcreteProduct
	* The ConcreteProduct is the actual implementation of the AbstractProduct and defines a product object to be created by the original AbstractFactory. It implements the AbstractProduct interface.
* Client
	* Uses only the interfaces defined by the AbstractFactory and ConcreteFactory and has no knowledge of the objects inner workings or additional functionality.

In this weeks discussion we're going to look at an example that...

### Discussion Questions

* After reading through the annotaed source code, what kinds of real world development problems could this help you solve. 

### Resources

* [Annotated Source Code](http://emcgary.r1l4b.com/discussions/006_abstract_factory.html)
* [GitHub](https://github.com/mcgaryes/crumblies/blob/master/js101/discussions/006/)
* [JSBin](http://jsbin.com/avepug/2/edit)
