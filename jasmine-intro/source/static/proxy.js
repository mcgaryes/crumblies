(function(){

	"use strict";

	/**
	 * Simple proxy service for external HTTP requests
	 */
	var Proxy = this.Proxy = function(options){
		if(options) {
			if(options.root) {
				this._rootURL = options.root;
			}
			if(options.method) {
				this._requestMethod = options.method;
			}
			this.options = options;
		}
	};

	Proxy.prototype = Object.create({},{

		// ===========================================================
		// === Private Variable ======================================
		// ===========================================================

		_requestMethod:{
			value:"ajax",
			writable:true
		},
		_rootURL:{
			value:"/",
			writable:true
		},

		// ===========================================================
		// === Public Variable =======================================
		// ===========================================================

		method:{
			get:function(){
				return this._requestMethod;
			}
		},
		root:{
			get:function(){
				return this._rootURL;
			}
		},

		// ===========================================================
		// === Private Methods =======================================
		// ===========================================================
		
		__parseRequest:{
			value:function(requestObject){
				var requestStr = this._rootURL;
				if(requestObject.id) {
					requestStr += requestObject.id + "/";
				}
				if(requestObject.data) {
					requestStr += this.__strigifyQueryData(requestObject.data);
				}
				return requestStr;
			}
		},
		__strigifyQueryData:{
			value:function(dataObject){
				var queryStr = "?";
				var index = 0;
				var total = Object.keys(dataObject).length;
				for(var prop in dataObject) {
					index++;
					queryStr += prop + "=" + dataObject[prop];
					if(index != total) {
						queryStr += "&";
					}
				}
				return queryStr;
			}
		},
		__parseResponse:{
			value:function(rootNode, responseObject){
				var data = JSON.parse(responseObject);
				return data[rootNode] ? data[rootNode] : data;

				// **** ADDITIONAL FUNCTIONALITY ****

				// return JSON.parse(responseObject);
			}
		},

		// ===========================================================
		// === Public Methods ========================================
		// ===========================================================

		get:{
			value:function(requestObject,callback,context){
				var delegate = this;
				$[this._requestMethod]({
					method:"GET",
					url: this.__parseRequest(requestObject),
					type:"json",
					success:function(data, textStatus, jqXHR){
						// initial
						callback.call(context,delegate.__parseResponse(requestObject.root, data));
					}
				});
			}
		},
		initialize:{
			value:function(options){
				// ...
			}
		}
	});

}).call(this);