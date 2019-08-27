const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const cache = {};

// region Helper Methods

function send404(res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.write("Error 404: resource not found.");
  res.end();
}

function sendFile(res, filePath, fileContent) {
  res.writeHead(200, { "Content-Type": mime.getType(filePath) });
  res.end(fileContent);
}

function serveStatic(res, cache, absPath) {
  if (cache[absPath]) {
    sendFile(res, absPath, cache[absPath]);
  } else {
    fs.access(absPath, (err) => {
      if (err) send404(res);
      else {
        fs.readFile(absPath, (err1, data) => {
          if (err1) {
            send404(res);
          } else {
            cache[absPath] = data;
            sendFile(res, absPath, data);
          }
        });
      }
    });
  }
}

// endregion

const server = http.createServer((req, res) => {
  let filePath = false;
  if (req.url === "/") {
    filePath = "public/index.html";
  } else {
    filePath = `public/${req.url}`;
  }

  const absPath = `./${filePath}`;
  serveStatic(res, cache, absPath);
});

server.listen(4008, () => {
  console.log(`Server is listening on port 4008`);
});

const chatServer = require('./lib/chat_server');
chatServer.listen(server);