var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const db_connection = mysql.createConnection(dbconfig);

router.get('/making', (req, res) => {
	var today = new Date();
	date_str = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + date.getDate();
	db_connection.connect();
	connection.query('insert into test_bed (made_date, cement, wsand, msand, bone, water) values('+date_str+','+req.query.cm+','+req.query.ws+','+req.query.ms+','+req.query.bn+','+req.query.wt+')', (error, rows, fields) => {
		if (error) throw error;
	});
	db_connection.end();
});

module.exports = router;