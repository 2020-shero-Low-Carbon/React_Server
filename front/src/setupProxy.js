const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
	app.use(createProxyMiddleware( '/back' ,{target: 'http://34.64.182.81:8000', changeOrigin: true}));	
};
