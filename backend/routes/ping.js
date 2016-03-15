"use strict"

let BaseRoute = localrequire('backend.base.route');
let PingController = localrequire('backend.controllers.ping');

/**
 * Providing path is mandatory. 
 * @type {String}
 */
const path = "/ping";

const routeConfig = {
    "/objectPrint" : {
        "method": "get",
        "function": "objectPrint"
    }
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

    objectPrint(req, res){
        res.end("i am objectPrint");
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
