"use strict"

let router = require('express').Router(),
	config = localrequire('config.json');

/**
 * Error to be throw in case not implemented
 */
let err = new Error('Not implemented');

class BaseRoute {
	constructor(path){
		if(!path)
			throw new Error("createRoute(path) needs routerpath as argument");

		this.path = path;

		router.get('/', function () {
	        // this wrapping is required because if provide
	        // function referene directly here then
	        // the overrided function would not be
	        // present at the time of execution
	        this.findAll.apply(this, arguments);
	    }.bind(this));

	    // map GET /:id
	    router.get('/:id', function () {
	        // this wrapping is required because if provide
	        // function referene directly here then
	        // the overrided function would not be
	        // present at the time of execution
	        this.findById.apply(this, arguments);
	    }.bind(this));

	    // map POST /
	    router.post('/', function () {
	        // this wrapping is required because if provide
	        // function referene directly here then
	        // the overrided function would not be
	        // present at the time of execution
	        this.create.apply(this, arguments);
	    }.bind(this));

	    // map PUT /:id
	    router.put('/:id', function () {
	        // this wrapping is required because if provide
	        // function referene directly here then
	        // the overrided function would not be
	        // present at the time of execution
	        this.update.apply(this, arguments);
	    }.bind(this));

	    // map DELETE /:id
	    router.delete('/:id', function () {
	        // this wrapping is required because if provide
	        // function referene directly here then
	        // the overrided function would not be
	        // present at the time of execution
	        this.deleteById.apply(this, arguments);
	    }.bind(this));
	}

	init(app){
		let path = config.server.baseApiPath;
	    path+=this.path;
	    app.use(path, router);
	}


	// handle GET /
	findAll(req, res) {
	    throw(err);
	};

	// handle GET /:id
	findById(req, res) {
	    throw(err);
	};

	// handle POST /
	create(req, res) {
	    throw(err);
	}

	// handle PUT /:id
	update(req, res) {
	    throw(err);
	}

	// handle DELETE /:id
	deleteById(req, res) {
	    throw(err);
	}

}    

module.exports = BaseRoute;
