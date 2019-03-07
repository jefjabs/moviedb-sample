const dotenv = require('dotenv').config();

module.exports={
	port:process.env.PORT,
	db_name:process.env.DB_NAME,
	db_port:process.env.DB_PORT,
	db_host:process.env.DB_HOST,
	db_user:process.env.DB_USER,
	db_pass:process.env.DB_PASS,
	db_type:process.env.DB_TYPE,
}
