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

// _.random
console.log(`xxl-random: ${_.random(10, 20, true)}`);

// _.isEmpty
console.log(`xxl-isEmpty: ${_.isEmpty(objA)}`);

// _.find : it seems this operator cannot do nested search
const data = [{id: '111', name: 'test1', age: 10, active: true}, {id: '122', name: 'test2', age: 30, active: false}, {id: '111', name: 'test1', age: 10, active: true}];
const searchResult = _.find(meterArray, ({ meters: { type: "test2", amount: 100 } }));
console.log(`xxl-find00: ${JSON.stringify(searchResult)}`);
const searchResult0 = _.find(meterArray, ['type', "test2"]);
console.log(`xxl-find11: ${JSON.stringify(JSON.stringify(searchResult0))}`);
console.log(`xxl-find22: ${JSON.stringify(_.find(data, {id: '111', name: 'test1', age: 10}))}`);
console.log(`xxl-find33: ${JSON.stringify(_.find(data, ['age', 30]))}`);
const data2 = [[{'1122': 0}, {'234': 0}]];
console.log(`xxl-find44: ${JSON.stringify(_.find(data2, (item) => { return item === [{'1122': 0}, {'234': 0}] }))}`);

// _.filter
console.log(`xxl-filter00: ${JSON.stringify(_.filter(data, 'active'))}`);
console.log(`xxl-filter11: ${JSON.stringify(_.filter(data, (item) => { return item.age > 10}))}`);

// _.uniq: it seems uniq only applies to primitive classes because objects with the same value have different references
console.log(`xxl-uniq00: ${JSON.stringify(_.uniq(data))}`);
console.log(`xxl-uniq11: ${JSON.stringify(_.uniq([12, 10, 10, 30, false, false, '112', '112', objA, objB]))}`);

class sample {
  constructor(transformer) {
    this.transformer = transformer;
  }

  getCountries() {
    this.transformer.getCountries();
  }
}

module.exports = sample;

