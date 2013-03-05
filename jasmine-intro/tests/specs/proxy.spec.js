describe("The proxy service",function(){

	// global variables
	var proxy;

	// setup
	beforeEach(function(){
		proxy = new Proxy({
			root:"http://localhost:8888/"
		});
	});

	// teardown
	afterEach(function(){
		proxy = undefined;
	});

	// initialization
	it("should initialize correctly",function(){
		expect(proxy.root).toEqual("http://localhost:8888/");
		expect(proxy.method).toEqual("ajax");
	});

	// 'get' functionality
	describe("'get' functionality",function(){

		it("should parse request data correctly",function(){
			var expected = "?foo=bar";
			var actual = proxy.__strigifyQueryData({ foo: "bar" });
			expect(actual).toEqual(expected);
		});

		it("should create the request url correctly",function(){
			var expected = "http://localhost:8888/foo/?foo=bar";
			var actual = proxy.__parseRequest({
				id:"foo",
				data:{
					foo:"bar"
				}
			});
			expect(actual).toEqual(expected);
		});

		it("should parse request response data correctly",function(){
			var dummyResponse = '{ "data":{ "foo":"bar" } }';
			var parsedResponse = proxy.__parseResponse("data", dummyResponse);
			expect(parsedResponse.foo).toEqual("bar");
		});
	});

});