const _ = require('lodash');

// scope example
const change = function(a) {
  a = 100;
  console.log(a);
};

const a = 10;
change(a);
console.log(a);

// module.exports vs exports
const module1 = {
  exports: {
    name: "module->exports attribute"
  }
};

exports = module1.exports;

console.log("module exports attribute: ", module1.exports);
console.log("module.exports: ", exports);
/*
result will be:
module exports attribute:  { name: 'module->exports attribute' }
module.exports:  { name: 'module->exports attribute' }
 */

exports = require("./ModulePath.js");

console.log("module exports attribute: ", module1.exports);
console.log("exports.method: ", exports);
console.log("exports.exports: ", exports.exports);
/*
result will be:
module exports attribute:  { name: 'module->exports attribute' }
module.exports:  { name: 'module->exports attribute' }
module exports attribute:  { name: 'module->exports attribute' }
exports.method:  { name: 'module.exports: to iterate module paths',
  method: [Function: method] }
exports.exports:  undefined
 */

const groups = [
  { id: "12345", groupId: 4, companyId: 5, name: "test1" },
  { id: "12567", groupId: 4, companyId: 5, name: "test4" },
  { id: "1095", groupId: 33, companyId: 34, name: "test5" },
  { id: "1250", groupId: 33, companyId: 5, name: "test6" }
];

const groupResult = _.orderBy(_.groupBy(groups, 'groupId'), 'companyId');
_.forEach(groupResult, (item) => {
  console.log(`xxl-item: ${JSON.stringify(item)}`)
});

_.times(groups.length, (index) => {
  console.log(`xxl-times: ${JSON.stringify(groups[index])}`)
});

class sample {
    constructor(transformer) {
        this.transformer = transformer;
    }

  getCountries() {
    this.transformer.getCountries();
  }
}

module.exports = sample;

