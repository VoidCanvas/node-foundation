"use strict"

let BaseController = localrequire('backend.base.controller');
let PingModel = localrequire('backend.models.ping.model');

class PingController extends BaseController{
	constructor(){
		super();

		//do your stuffs here
		this.ping = new PingModel();
	}

	checkPing(){
		return this.ping.validate();
	}

	getValidationErrors(){
		this.checkPing();
		return this.ping.validationErrors;
	}
}

module.exports = new PingController();