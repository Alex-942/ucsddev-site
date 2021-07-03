var date = new Date();   
var http = require('http');
//const httpProxy = require('http-proxy');
var string = date.toLocaleString();
//const express = require("express");
//const PORT = 3000;

//const app = express();
//
//app.get("/test", (req, res) => {
//    res.json({ ok: true });
//  });
//app.listen(PORT, () => console.log("Server is listening on port " + PORT));

//const proxy = httpProxy.createProxyServer({});
//http.createServer(function(req, res) {
//    res.writeHead(200, {'Content-Type': 'text/html',  'Cache-Control': 'no-cache' });
//    res.write('<h1>Hello World! We are UCSDDevs</h1>\n');
//    console.log('Request', req.method, req.url);
//    proxy.web(req, res, { target: `${req.protocol}://${req.hostname}` });
//}).listen(5000);


//const { Script } = require('node:vm');
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html',  'Cache-Control': 'no-cache' });
    response.write('<h1>Hello World! We are UCSDDevs</h1>\n');
    response.write('<h3 id="time">Current Time: ' + string + ' <h3>'); 
    //response.redirect("ucsddev.site/cgi-bin/node/node-hello-html-world.js");
    response.end();
}).listen(5000);
//console.log('Server running at http://localhost:5000/'); 




/*var date = new Date();   
//var hello = document.createElement("P");  
//var today = document.createElement("P");
//hello.innerText = "Hello World, we are UCSDDevs";
//today.innerText = date;               
//document.body.appendChild(hello);
//document.body.appendChild(today);
//document.write("Hello World, we are UCSDDevs"); 
<p>Hello World, we are UCSDDevs</p> 
var code = '<p>Hello World</p>';
var html = ''+
    '<body>'+
        '<div>'+
            '<p>Hello World</p>'+
        '</div>'+
    '</body>';
document.write(html);*/
//document.write("Hello World, we are UCSDDevs"); 