const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
const path = require('path');

router.post('/gwp', (req, res) => {
	const dates = req.body;
	console.log(dates)
	const pwd_dir = spawn('pwd');
	pwd_dir.stdout.on('data', function(data){
		console.log(data.toString());
	});

	const py_cal_gwp = spawn('python3', ['./server/routes/S-HERO.py', dates.syear, dates.smonth, dates.sday, dates.fyear, dates.fmonth, dates.fday, dates.prod]);
	var result = {
		gwp : 0.
	};
	py_cal_gwp.stdout.on('data', function(data){
		console.log('gwp calculate script running');
		result.gwp = parseFloat(data.toString());
	});

	py_cal_gwp.on('close', (code) => {
		console.log('gwp calculate script finished');
		res.send();
	});
});

module.exports = router;