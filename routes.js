const express = require('express');

module.exports = {
	init:function(app){
		/*Start RESTFUL Endpoints*/
		app.get('/api/v1/Movie',         controllers.Home.getMovies);
		app.post('/api/v1/Movie',        controllers.Home.createMovie);
		app.get('/api/v1/Movie/:_id',    controllers.Home.getMovie);
		app.put('/api/v1/Movie/:_id',    controllers.Home.updateMovie);
		app.delete('/api/v1/Movie/:_id', controllers.Home.deleteMovie);
		/*End Api Endpoints Here*/

		/*Serve Compiled React Build as Public Frontend App*/
		app.use(express.static('web/build'));

		/*Let reactjs handles the routing, including the 404 page*/
		app.use(function(req,res){
			res.status(404).sendFile(__dirname+"/web/build/index.html");
		});
	}
}

