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