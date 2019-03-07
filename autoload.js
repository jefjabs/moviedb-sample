const fs = require('fs');
const path = require('path');

/*Autoload config file*/
global.config = require("./config.js");

module.exports = {
	start:function(app){
		/*These should be in order*/
		autoload("models");
		autoload("services");
		autoload("controllers");
	}
}

function autoload(dir){
	global[dir]=[];
	var filenames = fs.readdirSync(dir);
	filenames = filenames.filter(function(file){
		return path.extname(file).toLowerCase() === ".js";
	});
	for(var filename of filenames){
		var name = filename.split('.').slice(0, -1).join('.');
		global[dir][name] = require("./"+dir+"/"+filename);

	}
}

