const http = require("http");
const formidable = require("formidable");
const fs = require("fs");

http.createServer((req, res) => {
  if (req.url === "/upload") {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      const pathBefore = files.fileupload.path;
      const pathAfter = '../data/' + files.fileupload.name;
      fs.rename(pathBefore, pathAfter, (error) => {
        if (error) throw error;
        res.write("Uploading successfully!");
        res.end();
      });
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<form action="upload" method="post" enctype="mutipart/form-data">`);
    res.write('<input type="file" name="fileupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(4008);