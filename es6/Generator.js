// example one
function* foo() {
  yield 'hello';
  yield 'generator';
  return 'finished';
}

const fooIterator = foo();
console.log('xxl-1st:', fooIterator.next());
console.log('xxl-2nd:', fooIterator.next());
console.log('xxl-3rd:', fooIterator.next());
console.log('xxl-4th:', fooIterator.next());
// output above:
// xxl-1st: { value: 'hello', done: false }
// xxl-2nd: { value: 'generator', done: false }
// xxl-3rd: { value: 'finished', done: true }
// xxl-4th: { value: undefined, done: true }

// example two: flatten arrays
const arr = [1, 3, [5, 0], [[9, 10, [22]]], 6];
const flatten = function* (input) {
  const len = input.length;
  for (let i = 0; i < len; i++) {
    const item = input[i];
    if (typeof item !== "number") {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
};

const result = [];
for( let item of flatten(arr)) {
  result.push(item);
}
console.log(result);
