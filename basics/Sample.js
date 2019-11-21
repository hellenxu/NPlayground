const _ = require("lodash");

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

const groupResult = _.orderBy(_.groupBy(groups, "groupId"), "companyId");
_.forEach(groupResult, (item) => {
  console.log(`xxl-item: ${JSON.stringify(item)}`);
});

// can replace with _.forEach
_.times(groups.length, (index) => {
  console.log(`xxl-times: ${JSON.stringify(groups[index])}`);
});

// _.map
const meterArray = [
  {
    meterByZone: {
      zone: "aa",
      meters: { type: "test1", amount: 100 }
    },
    meterByTime: {
      zone: "bb",
      meters: { type: "test2", amount: 100 }
    }
  },
  {
    meterByZone: {
      zone: "aa1",
      meters: { type: "test3", amount: 100 }
    },
    meterByTime: {
      zone: "bb1",
      meters: { type: "test4", amount: 100 }
    }
  }];
const result =
  _.map(meterArray, (info) => {
    return info.meterByZone.meters.type;
  });
console.log(`xxl-map: ${JSON.stringify(result)}`);

// _.cloneDeep vs. _.clone???
const objA = { id: '23456789'};
const objB = _.cloneDeep(objA);
const objC = _.clone(objA);
console.log(`xxl-B-is-A: ${objB === objA}; C-is-A: ${objC === objA}`);
console.log(`xxl-A: ${JSON.stringify(objA)}; B: ${JSON.stringify(objB)}; C: ${JSON.stringify(objC)}`);


class sample {
  constructor(transformer) {
    this.transformer = transformer;
  }

  getCountries() {
    this.transformer.getCountries();
  }
}

module.exports = sample;

