Object.prototype.extend=function(obj){

	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			if(obj[i]  && typeof obj[i] === "object"){
					this[i] = obj[i].clone();
			}
			else
		   		this[i] = obj[i];
	  	}
	}
	return this;
}

Object.prototype.clone = function () {
	var emptyObject = new this.constructor();
	return emptyObject.extend(this);
}
