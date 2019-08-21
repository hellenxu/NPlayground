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