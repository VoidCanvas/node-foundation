"use strict"


Array.prototype.exportToDBModel = function () {
	let dbModelArray = [];
	this.forEach(function (model) {
		dbModelArray.push(model.exportToDBModel());
	});
	return dbModelArray;
}

Array.prototype.exportToUIModel = function () {
	let uiModelArray = [];
	this.forEach(function (model) {
		uiModelArray.push(model.exportToUIModel());
	});
	return uiModelArray;
}

