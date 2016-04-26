"use strict"

class ConfigManager {
	init(env){
		let webDevConfig = null;
		let webQaConfig = null;
		let webProdConfig = null;

		try{
			webDevConfig = localrequire("configs.server.dev.json");
		}
		catch(e){
			console.log("dev config not found!");
		}
		try{
			webQaConfig = localrequire("configs.server.qa.json");
		}
		catch(e){
			console.log("qa config not found!");
		}
		try{
			webProdConfig = localrequire("configs.server.prod.json");
		}
		catch(e){
			console.log("prod config not found!");
		}
		
		this.extend(webDevConfig);

		if(env){
			switch(env.toLowerCase()){
				case "qa":
					this.extend(webQaConfig);
					break;
				case "prod":
					this.extend(webProdConfig);
					break;
			}
		}
	}
}

module.exports = new ConfigManager();