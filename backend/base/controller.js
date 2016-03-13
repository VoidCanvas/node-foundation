"use strict"

let sessionManager = localrequire('core.infrastructure.session-manager');

class BaseController {
	constructor(){
		this.sessionManager = sessionManager;
	}
}


module.exports = BaseController;