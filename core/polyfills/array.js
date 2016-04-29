"use strict"

Array.prototype.exportToDBModel = function() {
	let dbModelArray = [];
	this.forEach((model) => {
		dbModelArray.push(model.exportToDBModel());
	});
	return dbModelArray;
}

Array.prototype.exportToUIModel = function(){
	let uiModelArray = [];
	this.forEach((model) => {
		uiModelArray.push(model.exportToUIModel());
	});
	return uiModelArray;
}

Array.prototype.createDBModel = function(modelConstructor){
	if(!modelConstructor)
		throw new Error ("modelConstructor is a mandatory parameter");
	let output = [];
	this.forEach((obj) => {
		let dbModel = new modelConstructor().importFromDBModel(obj);
		output.push(dbModel);
	});
	return output;
}

Array.prototype.createUIModel = function(modelConstructor){
	if(!modelConstructor)
		throw new Error ("modelConstructor is a mandatory parameter");
	let output = [];
	this.forEach((obj) => {
		let uiModel = new modelConstructor().importFromUIModel(obj);
		output.push(uiModel);
	});
	return output;
}
