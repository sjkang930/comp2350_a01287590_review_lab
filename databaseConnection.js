const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

//mysql://w607giaibrxjx4ze:nc47f2a4pcsri9od@eanl4i1omny740jw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/qfa6b4l4ihc0n95m
const dbConfigHeroku = {
	host: "eanl4i1omny740jw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "w607giaibrxjx4ze",
	password: "nc47f2a4pcsri9od",
	database: "qfa6b4l4ihc0n95m",
	multipleStatements: false,
	namedPlaceholders: true 
};

const dbConfigLocal = {
    host: "localhost",
	user: "root",
	password: "R751956r",
	database: "restaurant_review",
	multipleStatements: false,
	namedPlaceholders: true 
};

if (is_heroku) {
	var database = mysql.createPool(dbConfigHeroku);
}
else {
	var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
		