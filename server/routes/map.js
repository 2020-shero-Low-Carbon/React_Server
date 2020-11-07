
var request = require('request');


var id = '51s94m45dn';
var key = 'gRUJE74piU8jN2dBcw57bUDu9Ll93AHyUwVI8FUk';
var start = '126.970871,37.300472'; //차후에 직접입력받게
var goal = '126.971687,37.299039'; //위와동일
var option = 'trafast';
//trafast 빠른길 tracomfort 편한길 traoptimal 최적 traavoidtoll 무료

var url = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving";
var queryParams = '?' + encodeURIComponent('start') + '=' + start; /* Service Key*/
queryParams += '&' + encodeURIComponent('goal') + '=' + goal; /* */
queryParams += '&' + encodeURIComponent('option') + '=' + option; /* */

var urlq = url + queryParams;


request.get({
	uri:urlq,
	headers:{
		'X-NCP-APIGW-API-KEY-ID':id,
		'X-NCP-APIGW-API-KEY':key
	}
},function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    var bdjs = JSON.parse(body); //json으로 파싱
	console.log(bdjs);
	var distance = bdjs.route.trafast[0].summary.distance;
	//console.log(distance);

});
