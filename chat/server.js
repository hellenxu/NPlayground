const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const cache = {};

// region Helper Methods

function send404(res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('Error 404: resource not found.');
  res.end();
}

function sendFile(res, filePath, fileContent) {
  res.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
  res.end(fileContent);
}

function serveStatic(res, cache, absPath) {
  if (cache[absPath]) {
    sendFile(res, absPath, cache[absPath]);
  } else {
    fs.access(absPath, (err) =>{
      if (err) send404(res);
      fs.readFile(absPath, (err1, data) => {
        if (err1) {
          send404(res);
        } else {
          cache[absPath] = data;
          sendFile(res, absPath, data);
        }
      })
    });
  }
}

// endregion
