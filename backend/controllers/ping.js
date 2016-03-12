"use strict"

let BaseController = localrequire('backend.base.controller');
let PingModel = localrequire('backend.models.ping.model');

class PingController extends BaseController{
	constructor(){
		super();
		this.model = new PingModel();

		//do your stuffs here
	}

	checkPing(){
		return this.model.validate();
	}

	getValidationErrors(){
		this.checkPing();
		return this.model.validationErrors;
	}
}

module.exports = PingController;