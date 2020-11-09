var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const db_connection = mysql.createConnection(dbconfig);

router.get('/showlist', (req, res) => {
	query_str = 'select * from test_bed';
	db_connection.query(query_str, (error, rows, fields) => {
		if (error) throw error;
		console.log(rows);
		res.send('history will be there');
	});
});

module.exports = router;