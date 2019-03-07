const bodyParser = require('body-parser');
module.exports = {
	start:function(app){
		app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});

		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());

		/*routes should be defined after setting up bodyparser module*/
		require("./routes.js").init(app);

		app.listen( config.port, () => console.log('Zebbery is running on port '+config.port)); 
	}
}
