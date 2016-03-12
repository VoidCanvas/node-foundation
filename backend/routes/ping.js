var router = require('express').Router(),
	config = localrequire('config.json');
    Resource = localrequire('core.infrastructure.resource');
    
var PingModel = localrequire('backend.models.ping.model');
/**
 * This sets basic crud routes
 */
 var ping = new Resource(router);

// test override of GET '/' path
ping.findAll = function (req, res) {
	var ping = new PingModel();
	ping.validate();

    res.end(ping.validationErrors);
};



exports.init = function (app) {
    // apply any CORS rules or any authentication/authorizations
    // middleware here
    var path = config.server.baseApiPath;
    path+="/ping";
    app.use(path, router);
};
