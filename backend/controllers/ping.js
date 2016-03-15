"use strict"

let BaseController = localrequire('backend.base.controller');
let PingModel = localrequire('backend.models.ping.model');

class PingController extends BaseController {
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

	create(obj){
		let uiModel = this.model.createUIModel(obj);
		uiModel.validate();
		if(uiModel.validationErrors.length){
			return uiModel.validationErrors;
		}
		else{
			this.model.importFromUIModel(uiModel);
			this.model.validate();
			//return this.model.validationErrors;
		}
		return this.model;
	}

	findAll(){
		return this.sessionManager.get(this.session, "test");
	}

	findById(){
		this.sessionManager.set(this.session, {test: this.request.params.id});
		return this.request.params.id;
	}
}

module.exports = PingController;