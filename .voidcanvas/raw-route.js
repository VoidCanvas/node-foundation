"use strict"

let BaseRoute = localrequire('baseRoute');

@controllerDeclarationArea@

/**
 * Providing path is mandatory. 
 * @type {String}
 */
const path = "/@routePath@";

/**
 * for custom route configuration
 * @type {Object}
 */
const routeConfig = {

}

class @routeName@ extends BaseRoute{
    constructor(path){
        super(path);
        
        //do your stuffs here
    }

    @createController@

    //A must have function
    getRouteConfig(){
        return routeConfig;
    }

    //A must have function
    getPath(){
        return path;
    }

    //[GET] : /
    findAll(req, res){
        res.end("Route @routeName@ is working");
    }

    /*

    //[POST] : /
    create(req, res){
    }

    //[GET] : /:id
    findById(req, res){
    }

    //[PUT] : /:id
    update(req, res){
    }

    //[DELETE] : /:id
    deleteById(req, res){
        
    }

    */

}

module.exports = new @routeName@();