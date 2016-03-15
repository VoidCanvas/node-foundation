"use strict"

var ValidationModel = require('imvalid');


//helper functions
function getConstructor(propConfig) {
	if(propConfig && propConfig.type){
		let propConstructor = propConfig.type;
		let propDefaultValue = propConfig.value;
		//setting up the appropriate constructor
		if(propConstructor.indexOf('.')!==-1 || typeof global[propConstructor] !== "function")
			propConstructor = localrequire(`backend.models.${propConstructor}.model`);
		else
			propConstructor = global[propConstructor];

		//If you set the value explicitly to null, than it won't create the object. Else the nested object will be created
		return propConstructor;
	}
	else{
		throw new Error(`property must have a type`);
	}
}





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
			let propertyInfos = properties.properties;
			for(let propConfigName in propertyInfos){
				if(!propertyInfos.hasOwnProperty(propConfigName))
					continue;

				let propConfig = propertyInfos[propConfigName];
				let propConstructor = getConstructor(propConfig);
				let propDefaultValue = propConfig.value;
				let givenValue = (obj && obj[propConfigName]) || propDefaultValue;

				if(givenValue!==null)
						this[propConfigName] = new propConstructor(givenValue).valueOf();

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
	 * @param  {Object} obj - the ui model
	 * @return {Void}     it will load the property values in itself
	 */
	importFromUIModel(obj){
		let properties = this.getProperties();
		let appProperties = properties.properties;
		let uiMap = properties.uiMap;
		for(var propName in (uiMap || appProperties)){
			if(!obj.hasOwnProperty(propName) || !uiMap.hasOwnProperty(propName) || typeof obj[propName] === "function")
				continue;
			
			let appPropertyName = uiMap ? uiMap[propName] : propName;
			let uiPropertyValue = obj[propName];

			let propConfig = appProperties[appPropertyName];
			let propConstructor = getConstructor(propConfig);

			if(uiPropertyValue!==null){
				let childAppObj = new propConstructor().valueOf();
				this[appPropertyName] = (typeof childAppObj === "object") ? childAppObj.importFromUIModel(uiPropertyValue) : uiPropertyValue;
			}
		}
		return this;
	}

	/**
	 * This will load the properties from the given object considering the object as an db object
	 * @param  {Object} obj the db model
	 * @return {Void}     it will load the property values in itself
	 */
	importFromDBModel(obj){
		let properties = this.getProperties();
		let appProperties = properties.properties;
		let dbMap = properties.dbMap;
		for(var propName in obj){
			if(!obj.hasOwnProperty(propName) || !dbMap.hasOwnProperty(propName)  || typeof obj[propName] === "function")
				continue;

			let appPropertyName = dbMap ? dbMap[propName] : propName;
			let dbPropertyValue = obj[propName];

			let propConfig = appProperties[appPropertyName];
			let propConstructor = getConstructor(propConfig);

			if(dbPropertyValue!==null){
				let childAppObj = new propConstructor().valueOf();
				this[appPropertyName] = (typeof childAppObj === "object") ? childAppObj.importFromDBModel(uiPropertyValue) : childAppObj;
			}
		}
		return this;
	}

	/**
	 * This will create a UI model using the given object
	 * @param  {Object} obj 
	 * @return {Object}     
	 */
	createUIModel(obj){
		let properties = this.getProperties();
		let appProperties = properties.properties;
		let uiMap = properties.uiMap;
		let newModel = new ValidationModel();
		for(var propName in (uiMap || appProperties)){
			if(!obj.hasOwnProperty(propName) || !uiMap.hasOwnProperty(propName)  || typeof obj[propName] === "function")
				continue;
			
			let appPropertyName = uiMap ? uiMap[propName] : propName;
			let uiPropertyValue = obj[propName];

			let propConfig = appProperties[appPropertyName];
			let propConstructor = getConstructor(propConfig);

			if(uiPropertyValue!==null){
				let childAppObj = new propConstructor().valueOf();
				newModel[propName] = (typeof childAppObj === "object") ? childAppObj.createUIModel(uiPropertyValue) : uiPropertyValue;
			}
		}
		let validations = this.getValidations();
		if(validations){
			if(validations.ui)
				newModel.validations = validations.ui.clone();
			else
				newModel.validations = validations.api.clone();
		}
		return newModel;
	}

	/**
	 * this will export the model in UI model
	 * @return {Object} return a UI model without any validation details etc
	 */
	exportToUIModel(){

	}

}

module.exports = BaseModel;