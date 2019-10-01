const fs = require("fs");
let completedTasks = 0;
const tasks = [];
const wordCounts = {};
const filesDir = "./txt";

function checkIfComplete() {
  completedTasks++;
  if (completedTasks === tasks.length) {
    wordCounts.forEach((index) => {
      console.log(`index: ${index}`);
    });
  }
}

function countWordsInText(text) {
  const words = text.toString().toLowerCase().split(/\W+/).sort();

  words.forEach((word) => {
    if (word) {
      wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
    }
  });
}

fs.readdir(filesDir, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const task = (function(file) {
      return function() {
        fs.readFile(file, (error, text) => {
          if (error) throw error;
          countWordsInText(text);
          checkIfComplete();
        });
      };
    })(filesDir + "/" + file);

    tasks.push(task);
  });
  tasks.forEach((task) => {
    tasks[task]();
  });
});