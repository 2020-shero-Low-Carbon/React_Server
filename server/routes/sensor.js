var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const db_connection = mysql.createConnection(dbconfig);

//http://34.64.182.81:8000/sensor/making?am=10&cm=20&ws=30&ms=20&bn=20&wt=50
router.get('/making', (req, res) => {
	var today = new Date();
	today.setHours(today.getHours() + 9);
	date_str = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
	//db_connection.connect();
	query_str = 'insert into test_bed (made_date, amount, cement, wsand, msand, bone, water) values(\''+date_str+'\','+req.query.am+','+req.query.cm+','+req.query.ws+','+req.query.ms+','+req.query.bn+','+req.query.wt+')';
	console.log(query_str)
	db_connection.query(query_str, (error, rows, fields) => {
		if (error) throw error;
	});
	//db_connection.end();
	res.send('made history added')
});

module.exports = router;