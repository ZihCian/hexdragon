var connect = require('connect');
var serveStatic = require('serve-static');

var port = 8080;

connect().use(serveStatic(__dirname)).listen(port, function () {
	console.log("server running on " + port);
});