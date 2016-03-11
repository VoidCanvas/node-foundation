
var fs = require('fs');
var _app = null; //to be set on init
var express = require('express');
var config = localrequire('config.json');

var resourcePath = "backend/routes";
var actualResourcePath = "./../../backend/routes";

function setupResource(path) {
	if(path.indexOf('.js')===path.length-3){
		var modifiedPath = path.slice(0,path.length-3);
		modifiedPath=modifiedPath.replace(resourcePath,actualResourcePath);
		require(modifiedPath).init(_app);
	}
}

var walkAndInitializeResouce = function (path) {
	var files = fs.readdirSync(path);
	if (files && files.length){
		files.forEach(function(file) {
		    var actualPath = path+"/"+file;
		    var stats = fs.statSync(actualPath);
		    if(stats.isDirectory())
		    		walkAndInitializeResouce(actualPath);
		    	else
		    		if(stats.isFile())
		    			setupResource(actualPath);
		});
	}
}


var resourceHandler = {
	init:function (app) {
		_app = app;
		walkAndInitializeResouce(resourcePath);
		//initialize public folder
		app.use(express.static(config.client.baseFolder));		
	}
}

module.exports = resourceHandler;