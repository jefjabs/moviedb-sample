class Home {

	getMovies(req,res){
		var mov = new models.Movie();
		mov.collection.find({},function(err,result){
			if (err) throw err;
			result.toArray().then(function(movies){
				res.send(JSON.stringify(movies));
			});
		});
	}

	getMovie(req,res){
		var mov = new models.Movie();
		mov.values = req.query;
		mov.values._id = req.params._id;
		mov.get(function(result){
			res.send(JSON.stringify(mov.values));
		});
	}

	createMovie(req,res){
		var mov = new models.Movie();
		mov.values=req.body;
		if(!Array.isArray(mov.values.cast)){
			mov.values.cast = JSON.parse(mov.values.cast);
		}
		mov.validate(function(isValid,err){
			if(isValid){
				mov.save(function(result){
					var data = result.result;
					data.id=result.insertedId;
					res.send(JSON.stringify(data));
				});
			} else {
				controllers.Home.invalidData(res,err);
			}
		}.bind(this));
	}

	updateMovie(req,res){
		var mov = new models.Movie();
		mov.values=req.body;
		mov.values._id = req.params._id;
		if(!Array.isArray(mov.values.cast)){
			mov.values.cast = JSON.parse(mov.values.cast);
		}

		mov.validate(function(isValid,err){
			if(isValid){
				mov.save(function(result){
					res.send(JSON.stringify(result));
				});

			} else {
				controllers.Home.invalidData(res,err);
			}
		});
	}

	deleteMovie(req,res){
		var mov = new models.Movie();
		mov.values=req.query;
		mov.values._id = req.params._id;
		mov.delete(function(result){
			res.send(JSON.stringify(result));
		});
	}

	invalidData(res,err){
		res.status(500)
			.send(JSON.stringify({
				error:true,
				message:"Invalid Data Format",
				errors:err
			})
		);
	}

}


module.exports = new Home();
