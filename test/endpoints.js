const dotenv = require('dotenv').config();
var assert = require('assert');
const request = require('super-request');

describe('Testing Movie Listing Endpoint', function () {
	var base = 'http://localhost:'+process.env.PORT;
	it('GET /api/v1/Movie - Movie listing should be a valid JSON array', function (done) {
		request(base)
			.get("/api/v1/Movie")
			.expect(200)
			.end(function(err,res){
				if(err)throw err;
				if(Array.isArray(JSON.parse(res.body))){
				} else {
					throw new Error("Data is not a valid array");
				}
				done();
			})
	});


	it('GET /api/v1/Movie/:id - Movie info should be an valid movie object in JSON format', function (done) {
		request(base)
			.get("/api/v1/Movie/5c80c72126500f7e197dd657")
			.expect(200)
			.end(function(err,res){
				if(err)throw err;
				var movie = JSON.parse(res.body);
				if( 
					typeof movie != 'object' ||
					movie._id == undefined ||
					movie.cast == undefined ||
					movie.image == undefined ||
					movie.title == undefined ||
					movie.tags == undefined ||
					movie.summary == undefined 
				){
					throw new Error("Data is not a valid movie object");
				} 
				done();
			})
	});

	it('PUT /api/v1/Movie/:id - Updating Movie Detail', function (done) {
		request(base)
			.get("/api/v1/Movie/5c80c72126500f7e197dd657")
			.expect(200)
			.end(function(err,res){
				if(err)throw err;
				var movie = JSON.parse(res.body);
				if( 
					typeof movie != 'object' ||
					movie._id == undefined ||
					movie.cast == undefined ||
					movie.image == undefined ||
					movie.title == undefined ||
					movie.tags == undefined ||
					movie.summary == undefined 
				){
					throw new Error("Data is not a valid movie object");
				} else {
					movie.cast=JSON.stringify(movie.cast);
					movie.title="Gloria Bell - test";
					var titleOrig = movie.title;
					movie.title+=" - test";
					request(base)
						.put("/api/v1/Movie/5c80c72126500f7e197dd657")
						.form(movie)
						.end(function(err,res){
							var updateObj = JSON.parse(res.body);
							if(updateObj.ok == 1){
								movie.title=titleOrig;
								request(base)
									.put("/api/v1/Movie/5c80c72126500f7e197dd657")
									.form(movie)
									.end(function(){
										done();
									});
							} else {
								throw new Error(updateObj.message);
							}
						})
				}
			})
	});

});

