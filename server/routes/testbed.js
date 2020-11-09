var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const db_connection = mysql.createConnection(dbconfig);

router.get('/showlist', (req, res) => {
	query_str = 'select * from test_bed';
	db_connection.query(query_str, (error, rows, fields) => {
		if (error) throw error;
		var result_json = {};
		result_json['data'] = rows;
		const coef = [10.0, 3.0, 4.0, 4.5, 0.3];
		var indi = [0, 0, 0, 0, 0];
		var len = result_json['data'].length, total_amount = 0, vgwp = 0;
		for(var i = 0; i < len; i++) {
			total_amount += result_json['data'][i]['amount'];
			indi[0] += result_json['data'][i]['cement'] * coef[0];
			indi[1] += result_json['data'][i]['wsand'] * coef[1];
			indi[2] += result_json['data'][i]['msand'] * coef[2];
			indi[3] += result_json['data'][i]['bone'] * coef[3];
			indi[4] += result_json['data'][i]['water'] * coef[4];
		}
		if(total_amount != 0){
			var total_carbon = 0;
			for(var i = 0; i < 5; i++)total_carbon +=  indi[i];
			vgwp = total_carbon/total_amount;
		}
		result_json['gwp'] = vgwp;
		res.send(JSON.stringify(result_json));
	});
});

module.exports = router;