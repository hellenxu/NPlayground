const http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(`Hello http!!! ${req.url}`);
  res.end();
}).listen(4008);