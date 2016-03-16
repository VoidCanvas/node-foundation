"use strict"

let BaseController = localrequire('backend.base.controller');
let EmployeeModel = localrequire('backend.models.Employee.model');


function createUniqueId() {
	let timestamp = "";
	let now = new Date();

	timestamp += now.getFullYear().toString(); // 2011
	timestamp += now.getMonth();
	timestamp += now.getDate();
	timestamp += now.getHours();
	timestamp += now.getMinutes();
	timestamp += now.getSeconds();
	timestamp += now.getMilliseconds();

	return timestamp;
}


class EmployeeController extends BaseController {
	constructor(){
		super();
		this.model = new EmployeeModel();

		//do your stuffs here
	}

	create(obj){
		let uiModel = this.model.createUIModel(obj); //creating a propert ui contract object
		uiModel.validate(); //validating the model

		return new Promise(function (resolve, reject) {
			if(uiModel.isValid){
				this.model.importFromUIModel(uiModel); //if ui model is valid, update the app model
				if(!this.model.id)
					this.model.id = createUniqueId();

				let dbObject = this.model.exportToDBModel(); // will return the db object for that particular model

				this.dbClient.save(dbObject).then(function (obj) {
					resolve({"id": obj.id}); //if saved successfully, return the saved object
				}, function () {
					resolve("error occured while saving!!"); //in case of error
				});				
			}
			else{
				if(uiModel.validationErrors.length)
					resolve(uiModel.validationErrors);
				else{
					if(uiModel.companyDetails.validationErrors.length)
						resolve(uiModel.companyDetails.validationErrors);
					else
						resolve("Validation failed!!");
				}
			}
		}.bind(this));
	}

	findAll(){
		return this.dbClient.findAll();
	}

	findById(){
		let id = this.request.params.id;
		return this.dbClient.findById(id, "id");
	}

	deleteById(){
		let id = this.request.params.id;
		return this.dbClient.deleteById(id, "id");
	}
}

module.exports = EmployeeController;