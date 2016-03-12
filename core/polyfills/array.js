
// //to convert an array of objects to an array of certain type of objects
// Array.prototype.buildObjectArray = function (ElementClass) {
// 	var normalArray = this;
// 	var arr = [];
// 	if(normalArray && normalArray.length){
// 		normalArray.forEach(function (element) {
// 			arr.push(new ElementClass(element));
// 		});
// 	}
// 	return arr;
// };


// //to convert an array to upper type models
// Array.prototype.toUpperModel = function () {
// 	var objectArray = this;
// 	var arr = [];
// 	if(objectArray && objectArray.length){
// 		objectArray.forEach(function (object) {
// 			arr.push(object.toUpperModel());
// 		});
// 	}
// 	return arr;
// };
