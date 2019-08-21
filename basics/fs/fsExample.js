const fs = require("fs");

// Create or update files -- writeFile [replace the specific file and content if it exists]
fs.writeFile("../data/file001.txt", "Hello~ Creating new files", function(err) {
  if (err) throw err;
  console.log("Files saved...");
});

// Create or update files -- appendFile [append contents to a file]
fs.appendFile("../data/file002.txt", "Hello~ appendFile()", function(err) {
  if (err) throw err;
  console.log(`Files saved(appendFile)...`);
});

// Create files -- open [create a new empty file]
fs.open("../data/file003.txt", "w", function(err) {
  if (err) throw err;
  console.log(`Files created(open)...`);
});

// Delete files
fs.open("../data/file004.txt", "w", err => {
  if (err) throw err;
  console.log(`created file004.txt`);
});
fs.unlink("../data/file004.txt", err => {
  if (err) throw err;
  console.log(`File deleted..`);
});

// rename files
fs.open("../data/file005.txt", "w", err => {
  if (err) throw err;
  console.log(`created file005.txt`);
});
fs.rename("../data/file005.txt", "../data/file5.txt", err => {
  if (err) throw err;
  console.log(`renew file file005.txt to file5.txt`);
});