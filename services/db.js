const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class DB {
	constructor(){
		this.initialized=false;
		this.connect(()=>{});
	}

	connect(callback){
		if(this.initialized==true){
			callback();
			return;
		}
		var col = (config.db_user.trim()!="")?":":"";
		var url = config.db_type+"://"+config.db_user+col+config.db_pass+"@"+config.db_host+"/"+config.db_name;
		MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
			db = db.db(config.db_name);
			this.connection = db;
			this.initModels(db);
			this.initialized=true;
			callback();
		}.bind(this));
	}

	disconnect(){
		this.connection.close();
	}

	//Create collections based on models
	initModels(db){
		for(var model in models){
			var modelInstance = new models[model]();
			if(modelInstance.attributes!=undefined){
				db.createCollection(model);
			}
		}
	}
	
}

global.db = new DB();
module.exports = global.db;
