// contrived example
describe("The car",function(){

	// global variables
	var car;

	// setup
	beforeEach(function(){
		car = new Car();
	});

	// teardown
	afterEach(function(){
		car = undefined;
	});

	// initialization
	it("should start",function(){
		car.start();
		expect(car.running).toBeTruthy();
	});

	// 'get' functionality
	describe("windows",function(){

		it("should roll up",function(){
			car.rollWindowsUp();
			expect(car.windowsPosition).toEqual("up");
		});

		it("should roll down",function(){
			car.rollWindowsDown();
			expect(car.windowsPosition).toEqual("down");
		});

	});

});