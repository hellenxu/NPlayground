const http = require("http");
const fs = require("fs");

http.createServer(((req, res) => {
  if (req.url === "/") {
    fs.readFile('../data/titles.json', ((err, data) => {
      if (err) {
        console.log(`error: ${err}`);
        res.end("Server Error - cannot find data");
      } else {
        const titles = JSON.parse(data.toString());
        fs.readFile('./template.html', (error, data) => {
          if (error) {
            console.log(`read template error: ${error}`);
            res.end("Server Error - template loading failed");
          } else {
            const tmp = data.toString();
            const html = tmp.replace("%", titles.join("</li><li>"));
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
          }
        });
      }
    }));
  }
})).listen(4008, '127.0.0.1');