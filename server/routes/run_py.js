const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');

router.get('/gwp', (req, res) => {
	const py_cal_gwp = spawn('python3', ['S-HERO.py']);
	var result = {
		gwp = 0.
	};
	py_cal_gwp.stdout.on('data', function(data){
		console.log('gwp calculate script running')
		result.gwp = parseFloat(data.toString())
	});

	py_cal_gwp.on('close', (code) => {
		console.log('gwp calculate script finished')
		res.send()
	});
});