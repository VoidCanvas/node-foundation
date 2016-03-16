"use strict"

let BaseController = localrequire('backend.base.controller');
let EmployeeModel = localrequire('backend.models.Employee.model');

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
				let dbObject = this.model.exportToDBModel(); // will return the db object for that particular model

				this.dbClient.save(dbObject).then(function (obj) {
					resolve(obj); //if saved successfully, return the saved object
				}, function () {
					resolve("error occured while saving!!"); //in case of error
				});				
			}
			else{
				resolve("Validation failed!!");
			}
		}.bind(this));
	}

	findAll(){
		return this.dbClient.findAll();
	}

	findById(){
		let name = this.request.params.id;
		return this.dbClient.findById(name, "name");
	}

	deleteById(id){
		let name = this.request.params.id;
		return this.dbClient.deleteById(name, "name");
	}
}

module.exports = EmployeeController;