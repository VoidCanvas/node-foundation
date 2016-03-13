"use strict"

let BaseRoute = localrequire('backend.base.route');
let PingController = localrequire('backend.controllers.ping');

/**
 * Providing path is mandatory. 
 * @type {String}
 */
const path = "/ping";


class PingRoute extends BaseRoute{
    constructor(path){
        super(path);
        this.controller = new PingController();

        //do your stuffs here
    }

    findAll(req, res){
        res.end(JSON.stringify(this.controller.findAll()));
    }

    findById(req, res){
        res.end(this.controller.findById());
    }

    create(req, res){
    	var body = req.body;
    	var response = this.controller.create(body);
    	res.end(JSON.stringify(response));
    }
}

module.exports = new PingRoute(path);
