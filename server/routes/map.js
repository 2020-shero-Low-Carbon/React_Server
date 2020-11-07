var request = require('request');
var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const db_connection = mysql.createConnection(dbconfig);

var id = '51s94m45dn';
var key = 'gRUJE74piU8jN2dBcw57bUDu9Ll93AHyUwVI8FUk';
var start = '126.970871,37.300472'; //차후에 직접입력받게
var goal = '126.971687,37.299039'; //위와동일
var option = 'trafast';
//trafast 빠른길 tracomfort 편한길 traoptimal 최적 traavoidtoll 무료



//연도, 월, 일, 원료, 기업명, 주소, 입고량, 거리 
router.post('/insert', (req, res) => {
	const params = req.body;
	var url = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving";
	var queryParams = '?' + encodeURIComponent('start') + '=' + params.start; /* Service Key*/
	queryParams += '&' + encodeURIComponent('goal') + '=' + params.goal; /* */
	queryParams += '&' + encodeURIComponent('option') + '=' + 'traoptimal'; /* */
	var urlq = url + queryParams;

	request.get({
		uri:urlq,
		headers:{
			'X-NCP-APIGW-API-KEY-ID':id,
			'X-NCP-APIGW-API-KEY':key
		}
	},function (error, response, body) {
		var bdjs = JSON.parse(body);
		console.log(bdjs);
		var distance = bdjs.route.trafast[0].summary.distance;
		//console.log(distance);
		//console.log(urlq);
		db_connection.connect();
		db_connection.query('insert into '+params.fact+ '_ (연도, 월, 일, 원료, 기업명, 주소, 입고량, 거리) values('+params.year+','+params.month+','+params.day+','+params.ingredient+','+params.company+','+params.amount+','+distance+')', (error, rows, fields) => {
			db_connection.release()
			if (error) throw error;
		});
		//db_connection.end();
		res.send('ingredient information added');
	});
});

module.exports = router;