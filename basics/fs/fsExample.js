const fs = require('fs');

// similar function: appendFile()
fs.writeFile('../data/file001.txt', 'Hello~ Creating new files', function(err) {
  if (err) throw err;
  console.log('Files saved...');
});