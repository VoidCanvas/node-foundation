"use strict"

var ValidationModel = require('imvalid');

//base model is extracted from validation model
class BaseModel extends ValidationModel {
	constructor(){
		super();
		this.setupProperties();
		this.setupValidations();
	}

	setupProperties(){
		let properties = this.getProperties();

		//setting up the properties from property config
		if(properties && properties.properties){
			this.extend(properties.properties);
		}
	}

	setupValidations(){
		let validations = this.getValidations();
		if(validations && validations.api){
			this.validations = validations.api.clone();
		}
	}

}

module.exports = BaseModel;