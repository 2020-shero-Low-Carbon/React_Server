var http = require('http'); // node 내장 모듈 불러옴

var hostname = '127.0.0.1'; // localhost와 동일
var port = 3000;

var request = require('request');

var express = require('express');
var app = express();

//var moment = require('moment');
/*
var time = 0;
if (moment().format("HH")<07)
	time = moment().add(-1,'days').format("YYYYMMDD")+'1800';
else
	time = moment().format("YYYYMMDD")+'0600';
*/

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

//console.log(urlq);

var jstest = {"code":0,"message":"길찾기를 성공하였습니다.","currentDateTime":"2020-11-01T03:00:37","route":{"trafast":[{"summary":{"start":{"location":[126.9708709,37.3004715]},"goal":{"location":[126.9716866,37.2990383],"dir":1},"distance":328,"duration":49978,"departureTime":"2020-11-01T03:00:37","bbox":[[126.9708709,37.2990383],[126.9725246,37.3006140]],"tollFare":0,"taxiFare":4550,"fuelPrice":31},"path":[[126.9708925,37.3006140],[126.9717698,37.3005251],[126.9720894,37.3004932],[126.9724428,37.3004614],[126.9724597,37.3004588],[126.9724823,37.3004571],[126.9725051,37.3004301],[126.9725222,37.3004050],[126.9725246,37.3003761],[126.9724924,37.3001371],[126.9724240,37.2997582],[126.9723997,37.2996833],[126.9723619,37.2995993],[126.9723117,37.2995162],[126.9719995,37.2991416],[126.9719081,37.2991511],[126.9717082,37.2991718]],"section":[{"pointIndex":0,"pointCount":6,"distance":143,"name":"덕영대로","congestion":2,"speed":34},{"pointIndex":9,"pointCount":6,"distance":122,"name":"서부로","congestion":3,"speed":22}],"guide":[{"pointIndex":5,"type":5,"instructions":"오른쪽 방향","distance":143,"duration":15007},{"pointIndex":14,"type":3,"instructions":"'서부로2135번길' 방면으로 우회전","distance":159,"duration":25612},{"pointIndex":16,"type":88,"instructions":"목적지","distance":26,"duration":9359}]}]}};
var jstsstr = JSON.stringify(jstest);
console.log(jstsstr);

/*
http.createServer(function(req, res){
  res.writeHead(200, { 'Content-Type': 'application/JSON' });
  res.write();
  res.end();
}).listen(port, hostname);
*/
/*
var distance;

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
	//console.log(bdjs);
	distance = bdjs.route.trafast[0].summary.distance;
	//console.log(distance);
	
	//console.log(urlq);
	
});

console.log(distance);
*/

function getHeaders(url){
	return new Promise(resolve=>{
		request.get({
			uri:url,
			headers:{
				'X-NCP-APIGW-API-KEY-ID':id,
				'X-NCP-APIGW-API-KEY':key
			}
		},function (error, response, body) {
			//console.log('Status', response.statusCode);
			//console.log('Headers', JSON.stringify(response.headers));
			var bdjs = JSON.parse(body); //json으로 파싱
			//console.log(bdjs);
			distance = bdjs.route.trafast[0].summary.distance;
			//console.log(distance);
			
			//console.log(urlq);
			resolve(distance);
		})	
	})
	
};
var dist ;
console.log(
	getHeaders(urlq)
		.then(function(result){
		return result
}))


getHeaders(urlq)
	.then(function(result){
	console.log(result)
})
//app.use(getHeaders(urlq).then(function(req, res) {res.send(distance)}));

/*app.use(function(req, res){
	
	});
	
});*/
app.listen(port, function() {
	console.log('server running at https://localhost:'+port);
});

