"use strict"

var ValidationModel = require('imvalid');

//base model is extracted from validation model
class BaseModel extends ValidationModel {

	/**
	 * Constructor for the models
	 * @param  {Object} obj An optional parameter to initiate properties
	 * @return {Void}     
	 */
	constructor(obj){
		super(obj);
		this.setupProperties(obj);
		this.setupValidations();
	}

	/**
	 * it will setup the required properties as given in /models/modelName/properties.json
	 * @param  {Object} obj this is an optional param. If it's provided the value will be taken from this, else the default value from properties.json
	 * @return {Void}     
	 */
	setupProperties(obj){
		let properties = this.getProperties();

		//setting up the properties from property config
		if(properties && properties.properties){
			this.extend(properties.properties);

			//overriding with given properties
			if(obj){
				for(let i in obj){
					if(obj.hasOwnProperty(i) && properties.properties.hasOwnProperty(i)){
						this[i]=obj[i];
					}

				}
			}
		}
	}

	/**
	 * As the model object is extended from ValidationModel, so setting up the validation property is necessary
	 * @return {[type]} [description]
	 */
	setupValidations(){
		let validations = this.getValidations();
		if(validations && validations.api){
			this.validations = validations.api.clone();
		}
	}

	/**
	 * This will load the properties from the given object considering the object as an ui model
	 * @param  {Object} obj the ui model
	 * @return {Void}     it will load the property values in itself
	 */
	loadFromUIModel(obj){
		let properties = this.getProperties();
		let uiMap = properties.uiMap;
		let newModel = this;

		if(!uiMap){
			for(var i in obj){
				if(obj.hasOwnProperty(i)){
					let value = obj[i];
					newModel[uiMap[i]] = value;
				}
			}
		}
		else{
			for(var i in uiMap){
				if(uiMap.hasOwnProperty(i)){
					let value = obj[i] || appProperties[uiMap[i]];
					newModel[uiMap[i]] = value;
				}
			}		
		}
	}

	/**
	 * This will create a UI model using the given object
	 * @param  {Object} obj 
	 * @return {Object}     
	 */
	createUIModel(obj){
		let properties = this.getProperties(),
			validations = this.getValidations(),
			appProperties = properties.properties,
			uiMap = properties.uiMap

		let newModel = new ValidationModel();

		if(!uiMap){
			newModel.extend(appProperties);
			newModel.validations = validations.api;
		}
		else{
			for(var i in uiMap){
				if(uiMap.hasOwnProperty(i) && obj.hasOwnProperty(i)){
					let value = obj[i];
					newModel[i] = value;
				}
			}		
			newModel.validations=validations.ui;
		}
		
		return newModel;
	}

}

module.exports = BaseModel;