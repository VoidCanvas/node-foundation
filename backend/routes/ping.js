"use strict"

let BaseRoute = localrequire('backend.base.route');
let PingController = localrequire('backend.controllers.ping');

/**
 * Providing path is mandatory. 
 * @type {String}
 */
const path = "/ping";

const routeConfig = {
    "/object" : {
        "method": "get",
        "function": "object"
    },
    "/objectValidations" : {
        "method": "get",
        "function": "objectValidations"
    },
}


class PingRoute extends BaseRoute{
    constructor(path){
        super(path);
        this.controller = new PingController();

        //do your stuffs here
    }

    getRouteConfig(){
        return routeConfig;
    }

    getPath(){
        return path;
    }

    object(req, res){
        res.end(JSON.stringify(this.controller.model));
    }
    objectValidations(req, res){
        this.controller.model.validate();
        res.end(JSON.stringify(this.controller.model.validationErrors));
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

module.exports = new PingRoute();
