"use strict"

let BaseRoute = localrequire('backend.base.route');
let pingController = localrequire('backend.controllers.ping');

/**
 * Providing path is mandatory. 
 * @type {String}
 */
const path = "/ping";


class PingRoute extends BaseRoute{
    constructor(path){
        super(path);
    }

    findAll(req, res){
        res.end(JSON.stringify(pingController.getValidationErrors()));
    }
}

module.exports = new PingRoute(path);
