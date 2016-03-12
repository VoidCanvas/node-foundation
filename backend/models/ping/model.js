/**
 * This is model `Ping`
 */
"use strict"


let BaseModel = localrequire('backend.base.model');
let validationConfig = require('./validations.json');
let propertiesConfig = require('./properties.json');

class PingModel extends BaseModel{

	//the constructor of the model. 
	constructor(){
		super();

		//model specific customizations can be done here
	}

	getProperties(){
		return propertiesConfig;
	}

	getValidations(){
		return validationConfig;	
	} 
}

module.exports = PingModel;