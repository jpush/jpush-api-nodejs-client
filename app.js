/**
 * Created by 泽帆 on 2014/5/29 0029.
 */

var http = require('http');
var JPUSH = require('./lib/jpush.js');


http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello world</p>');
}).listen(3000);

console.log("Http Server running.");
