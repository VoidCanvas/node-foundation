var router = require('express').Router(),
	config = localrequire('config.json');
    Resource = localrequire('core.infrastructure.resource');
/**
 * This sets basic crud routes
 */
 var ping = new Resource(router);

// test override of GET '/' path
ping.findAll = function (req, res) {
    res.end("PONG!");
};



exports.init = function (app) {
    // apply any CORS rules or any authentication/authorizations
    // middleware here
    var path = config.server.baseApiPath;
    path+="/ping";
    app.use('/api/ping', router);
};
