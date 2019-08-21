const http = require("http");
const url = require("url");
const fs = require("fs");

// example: parsing query string
// http.createServer(function(req, res) {
//   const query = url.parse(req.url, true).query;
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end(`${query.language} ${query.location}`);
// }).listen(4008);

// example: read files
http.createServer(function(req, res) {
  fs.readFile("../data/test.html", function(err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
}).listen(4008);