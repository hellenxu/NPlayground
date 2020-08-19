const _ = require('lodash');

// intersection
const arr1 = [1, 2, 3, 4, 5, 8, 9], arr2 = [5, 6, 7, 8, 9];
const intersection = arr1.filter(function(val) { return arr2.indexOf(val) > -1 });
console.log(`intersection result: ${intersection}`);

const objArr1 = [{ name: 'name1', id: 1}, { name: 'name2', id: 2}, { name: 'name3', id: 3}, { name: 'name5', id: 5}];
const objArr2 = [{ name: 'name1', id: 1}, { name: 'name2', id: 2}, { name: 'name3', id: 3}, { name: 'name4', id: 4}, { name: 'name5', id: 5}];
const result = objArr2.filter(function(v) {
  return objArr1.some(n => JSON.stringify(n) === JSON.stringify(v))
});
console.log(`object array intersection result: ${JSON.stringify(result)}`);

// difference
const diff = arr1.filter(item => !new Set(arr2).has(item));
console.log(`difference: ${diff}`);
const objDiff = objArr2.filter(function(v) {
  return objArr1.every(n => JSON.stringify(n) !== JSON.stringify(v));
});
console.log(`obj difference: ${JSON.stringify(objDiff)}`);

// remove duplicates
console.log(`after: ${Array.from(new Set(arr1.concat(arr2)))}`);

const input = objArr1.concat(objArr2);
const objRemoveDuplicate = [];
input.forEach(item => {
  !objRemoveDuplicate.some(v => JSON.stringify(v) === JSON.stringify(item)) && objRemoveDuplicate.push(item)
});
console.log(`object remove duplciates - input: ${JSON.stringify(input)}`);
console.log(`obj remove duplicates: ${JSON.stringify(objRemoveDuplicate)}`);

// sorting: compared function a - b <= 0 --> no position switch; a - b > 0 --> switching position
console.log([5, 2, 3, 4].sort((a, b) => a - b));
console.log([1, 2, 3, 4].sort((a, b) => b - a));
console.log([1, 2, 3, 3, 4].sort((a, b) => b - a));

// sorting: object array, based on values of object
console.log(`input: `, objArr2);
const result2 = objArr2.sort((a, b) => {
  // console.log(a, b);
  return b.id - a.id
});
console.log(`result2 = `, result2);
console.log(`==========`);
console.log(`input: `, objArr2);
const result1 = objArr2.sort((a, b) => {
    // console.log(a, b);
    return a.id - b.id;
  }
);
console.log("result1 = ", result1);

// sorting: interesting results [objArr2 will be changed after calling sorting]
console.log(`==========`);
console.log(`input before = `, objArr2);
const result3 = objArr2.sort((a, b) => a.id - b.id);
const result4 = objArr2.sort((a, b) => b.id - a.id);
console.log(`input after = `, objArr2);
console.log("result3 = ", result3);
console.log("result4 = ", result4);

// sorting: use lodash
console.log(`==========`);
console.log(`input before = `, objArr2);
const result5 = _.orderBy(objArr2, ['id'], ['asc']);
console.log(`result5 = `, result5);
console.log(`input after = `, objArr2);
console.log(`input before = `, objArr2);
const result6 = _.orderBy(objArr2, ['id'], ['desc']);
console.log(`result6 = `, result6);
console.log(`input after = `, objArr2);

// max
console.log(`==== Max =====`);
console.log(Math.max(...[3, 4, 2, 5]));
console.log([1, 3, 5, 0].reduce((pre, cur, curIndex, arr) => Math.max(pre, cur), 0)); // 0 is initial value

const maxResult = Math.max.apply(Math, objArr2.map(item => item.id));
console.log(maxResult);

// sum of array
const sumRes = [1, 2, 3, 5, 10].reduce((pre, cur) => pre + cur, 0);
console.log("sum of [1, 2, 3, 5, 10] is ", sumRes);

const sumObjArr = objArr2.reduce((pre, cur) => pre + cur.id, 0);
console.log("sum of id in array ", objArr2, sumObjArr);

// merging arrays
const mergRe1 = [1, 2, 3, 5, 7].concat([5, 6]); // wouldn't remove duplicates
console.log(mergRe1);
const mergRe2 = [...[1, 2, 3, 5, 7], ...[5, 6]];
console.log(mergRe2);
const mergRe3 = [].concat.apply([1, 2, 3, 5, 7], [5, 6]);
console.log(mergRe3);

// includes
// normal arrays
console.log([1, 2, 3, 5, 7].includes(3));
console.log([1, 2, 3, 5, 7].indexOf(4));
console.log([1, 2, 3, 5, 7].find((item) => item === 4));
console.log([1, 2, 3, 5, 7].findIndex((item) => item === 2));
// object arrays
console.log(objArr2.some((item) => JSON.stringify(item) === JSON.stringify({ name: 'name1', id: 1})));
console.log(objArr2.some((item) => item === { name: 'name1', id: 1})); // wrong way to check
console.log(objArr2.includes({ name: 'name1', id: 1})); // wrong way to check

// every
console.log([1, 2, 3, 5, 7].every((item) => item > 3 )); // false
console.log(objArr2.every((item) => item.id > 0)); // true

// some
console.log([1, 2, 3, 5, 7].some((item) => item > 3 )); // true
console.log(objArr2.some((item) => item.id > 10)); // false

// object to arrays
console.log('=== object to arrays ===')
console.log('keys: ', Object.keys(objArr2));
console.log('values: ', Object.values(objArr2));
console.log('entries: ', Object.entries(objArr2));

// arrays to object
const names = ['test1', 'test2', 'test3']
const ids = [10, 8, 7, 6]
const objs = names.map((item, index) => {
  return { name: item, id: ids[index] };
});
console.log(`xxl-objs: ${JSON.stringify(objs)}`);

// array deconstruction
const arr = [1, 10];
console.log(`before: `, arr);
console.log(`elements:`, arr[0], arr[1]);
[arr[1], arr[0]] = [arr[0], arr[1]];
console.log(`after: `, arr);
console.log(`elements:`, arr[0], arr[1]);

// object variables
const flag = false
const obj = {
  v1: 10,
  [flag ? 'c' : 'b']: 0
};
console.log("xxl-obj: ", obj);

// object deconstruction, not use all variables
const {name, id, ...others} = {name: 'test', age: 3, id: 100987, description: 'test account'};
console.log(`xxl-obj-deconstruction:`, name, id);