const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
const path = require('path');

router.post('/gwp', (req, res) => {
	const dates = req.body;
	var my_dir;
	const py_cal_gwp = spawn('python3', ['../DB/src/gwp_once.py', dates.syear, dates.smonth, dates.sday, dates.fyear, dates.fmonth, dates.fday, dates.prod]);
	var result = {
		gwp : 0.
	};
	py_cal_gwp.stdout.on('data', function(data){
		result.gwp = parseFloat(data.toString());
	});
	py_cal_gwp.stderr.on('data', (data) => {
		console.log(data.toString());
	});
	py_cal_gwp.on('close', (code) => {
		console.log('gwp calculate script finished');
		res.send(result);
	});
	
});

router.post('/gwplist', (req, res) => {
	const dates = req.body;
	var my_dir;
	var result;
	console.log(dates);
	const py_cal_gwplist = spawn('python3', ['../DB/src/gwp_get_min.py', dates.syear, dates.smonth, dates.sday, dates.fyear, dates.fmonth, dates.fday, dates.prod]);
	py_cal_gwplist.stdout.on('data', function(data){
		result = JSON.parse(data.toString());
	});
	py_cal_gwplist.on('close', (code) => {
		console.log('gwplist calculate script finished');
		res.send(result);
	});
});

module.exports = router;