"use strict"

let BaseRoute = localrequire('backend.base.route');
let EmployeeController = localrequire('backend.controllers.employee');
let dbClient = localrequire('dbClient');
/**
 * Providing path is mandatory. 
 * @type {String}
 */
const path = "/employee";

const routeConfig = {
    "/object" : {
        "method": "get",
        "function": "object"
    },
    "/objectValidations" : {
        "method": "get",
        "function": "objectValidations"
    },
    "/dbCheck" : {
        "method": "get",
        "function": "dbCheck"
    }
}


class EmployeeRoute extends BaseRoute{
    constructor(path){
        super(path);
        this.controller = new EmployeeController();

        //do your stuffs here
    }

    //A must have function
    getRouteConfig(){
        return routeConfig;
    }

    //A must have function
    getPath(){
        return path;
    }


    dbCheck(req, res){
        res.end(dbClient.sayHi());
    }

    object(req, res){
        res.end(JSON.stringify(this.controller.model.exportToDBModel()));
    }
    objectValidations(req, res){
        this.controller.model.validate();
        res.end(JSON.stringify(this.controller.model.validationErrors));
    }

    create(req, res){
    	var body = req.body;
    	this.controller.create(body).then(function (response) {
    	   res.end(JSON.stringify(response));
        });
    }

    findAll(req, res){
        res.end(JSON.stringify(this.controller.findAll()));
    }

    findById(req, res){
        res.end(JSON.stringify(this.controller.findById()));
    }

    deleteById(req, res){
        this.controller.deleteById().then(function (response) {
           res.end(JSON.stringify(response));
        })
    }

}

module.exports = new EmployeeRoute();
