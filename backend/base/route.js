"use strict"

let router = require('express').Router(),
	config = localrequire('config.json');

/**
 * Error to be throw in case not implemented
 */
let err = new Error('Not implemented');


class BaseRoute {
	constructor(){
		let path = this.getPath();
		if(!path)
			throw new Error("createRoute(path) needs routerpath as argument");

		this.path = path;

		//setting up custom routes
	    let routeConfig = this.getRouteConfig();
	    if(routeConfig){
	    	for(let routeName in routeConfig){
	    		if(routeConfig.hasOwnProperty(routeName)){
		    		let routeValue = routeConfig[routeName];
		    		let method = routeValue.method || "get";
		    		if(!routeValue.function)
		    			throw new Error(`no function is mapped to route ${routeName}`);
		    		router[method.toLowerCase()](routeName, function (req, res) {
						this._setupController(req, res);
		        		this[routeValue.function].apply(this, arguments);
		    		}.bind(this));
	    		}
	    	}
	    }


		router.get('/', function (req, res) {
			this._setupController(req, res);
	        /**
	         * [GET] 
	         * Each router you create need to override this method to active this route
	         */
	        this.findAll.apply(this, arguments);
	    }.bind(this));

	  
	    router.get('/:id', function (req, res) {
			this._setupController(req, res);
	    	
	        /**
	         * [GET] 
	         * Each router you create need to override this method to active this route
	         */
	        this.findById.apply(this, arguments);
	    }.bind(this));

	    
	    router.post('/', function (req, res) {
			this._setupController(req, res);

	        /**
	         * [POST] 
	         * Each router you create need to override this method to active this route
	         */
	        this.create.apply(this, arguments);
	    }.bind(this));

	    
	    router.put('/:id', function (req, res) {
			this._setupController(req, res);
	    
	        /**
	         * [PUT] 
	         * Each router you create need to override this method to active this route
	         */
	        this.update.apply(this, arguments);
	    }.bind(this));

	    router.delete('/:id', function (req, res) {
			this._setupController(req, res);
	    	
	        /**
	         * [DELETE] 
	         * Each router you create need to override this method to active this route
	         */
	        this.deleteById.apply(this, arguments);
	    }.bind(this));

	}


	_setupController(req, res){
		/**
		 * if controller is defined in the constructor of the route, initialize various things there
		 * @param  {Controller} this.controller is the controller of this particular route
		 */
        if(this.controller){
	        this.controller.request = this.controller.request || {};
	        this.controller.request.body = req.body;
	        this.controller.request.params = req.query.extend(req.params);
	        this.controller.session = req.session;
        }
	}

	init(app){
		let path = config.server.baseApiPath;
	    path+=this.path;
	    app.use(path, router);
	}


	/**
	 * [GET]
	 */
	findAll(req, res) {
	    throw(err);
	};

	/**
	 * [GET] :id
	 */
	findById(req, res) {
	    throw(err);
	};

	/**
	 * [POST]
	 */
	create(req, res) {
	    throw(err);
	}

	/**
	 * [PUT] :id
	 */
	update(req, res) {
	    throw(err);
	}

	/**
	 * [DELETE] :id
	 */
	deleteById(req, res) {
	    throw(err);
	}

}    

module.exports = BaseRoute;
