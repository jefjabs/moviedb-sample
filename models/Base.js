/* 
 * Base model class the should be extended by new custom models
 */

const ObjectId = require('mongodb').ObjectID;

class Base {
	constructor(){ 
		this.modelName  = Object.getPrototypeOf(this).constructor.name;
		this.values={};
		db.connect(function(){
			this.collection = db.connection.collection(this.modelName);
		}.bind(this));
	}

	/* @ToDo
	 * validate field values first before doing some DB stuff
	 * Model Attributes Policies compared to Model Instance Values
	 */
	validate(callback){
		var isValid = true;
		var errorMessages = [];
		for(var attr in this.attributes){
			if(this.attributes[attr].required != undefined && this.attributes[attr].required == true){
				if(this.values[attr]==undefined || this.values[attr]===""){
					isValid=false;
					errorMessages.push("'"+attr+"' is required");
				}
			}
		}
		callback(isValid,errorMessages);
	}

	get(callback){
		if(this.values._id!=undefined) this.values._id=ObjectId(this.values._id)
		this.collection.findOne(this.values,function(err,result){
			if(err) throw err;
			this.values=result;
			callback(result);
		}.bind(this));
	}

	save(callback){
		if(this.values != undefined && this.values._id!=undefined){
			var id = this.values._id
			delete this.values._id;
			this.collection.findOneAndUpdate(
				{_id:ObjectId(id)},
				{$set: this.values},
				{},
				function(err,result){
					if(err) throw err;
					callback(result);
				}
			);
		} else {
			this.collection.insertOne(this.values,function(err,result){
				if(err) throw err;
				callback(result);
			});
		}
	}

	delete(callback){
		if(this.values._id!=undefined) this.values._id=ObjectId(this.values._id)
		this.collection.deleteOne(this.values,function(err,result){
			if(err) throw err;
			callback(result);
		});
	}

}

module.exports = Base;
