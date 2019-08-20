const Worker = require("./Worker");

function instruct(x){
  const y = x - 10;
  console.log(`Worker = `, Worker)
  Worker.work(y)
}

module.exports = {
  instruct
};