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
			let propertyInfos = properties.properties;
			for(let propConfigName in propertyInfos){
				if(!propertyInfos.hasOwnProperty(propConfigName))
					continue;
				
				let propConfig = propertyInfos[propConfigName];
				if(propConfig && propConfig.type){
					let propConstructor = propConfig.type;
					let propDefaultValue = propConfig.value;
					//setting up the appropriate constructor
					if(propConstructor.indexOf('.')!==-1 || typeof global[propConstructor] !== "function")
						propConstructor = localrequire(`backend.models.${propConstructor}.model`);
					else
						propConstructor = global[propConstructor];

					let givenValue = (obj && obj[propConfigName]) || propDefaultValue;

					//If you set the value explicitly to null, than it won't create the object. Else the nested object will be created
					if(givenValue!==null)
						this[propConfigName] = new propConstructor(givenValue).valueOf();
				}
				else{
					throw new Error(`property ${propConfigName} must have a type`);
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
	 * @param  {Object} obj - the ui model
	 * @return {Void}     it will load the property values in itself
	 */
	importFromUIModel(obj){
		let properties = this.getProperties();
		let appProperties = properties.properties;
		let uiMap = properties.uiMap;

		for(var propName in obj){
			let propertyName = uiMap ? uiMap[propName] : propName;

			if(obj.hasOwnProperty(propName) && appProperties.hasOwnProperty(propertyName)){
				let propValue = obj[propName];
				if(propValue && typeof propValue === "object"){

				}
				else{
					this[i] = value;
				}
			}
		}
	}

	/**
	 * This will load the properties from the given object considering the object as an db object
	 * @param  {Object} obj the db model
	 * @return {Void}     it will load the property values in itself
	 */
	loadFromDBModel(obj){
		let properties = this.getProperties();
		let appProperties = properties.properties;
		let dbMap = properties.dbMap;
		let newModel = this;

		if(!dbMap){
			for(var i in obj){
				if(obj.hasOwnProperty(i) && appProperties.hasOwnProperty(i)){
					let value = obj[i];
					newModel[i] = value;
				}
			}
		}
		else{
			for(var i in dbMap){
				if(dbMap.hasOwnProperty(i) && appProperties.hasOwnProperty(dbMap[i])){
					let value = obj[i] || appProperties[dbMap[i]];
					newModel[dbMap[i]] = value;
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

	/**
	 * this will export the model in UI model
	 * @return {Object} return a UI model without any validation details etc
	 */
	exportToUIModel(){

	}

}

module.exports = BaseModel;