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
// output: [ 1, 3, 5, 0, 9, 10, 22, 6 ]

// example three: need () if using yield in an expression;
function* yieldInOtherExpression() {
  console.log('Hello' + (yield) );
//   console.log('Hello' + yield );
//                         ^^^^^
//
//   SyntaxError: Unexpected identifier
  console.log('Generator', yield 123);
}

const yeildRe = yieldInOtherExpression();
console.log(yeildRe.next());
console.log(yeildRe.next());
console.log(yeildRe.next());

// with Iterator interfaces
const iterable = {};
iterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 5;
};
console.log([...iterable]); // use operator ... to replace next
// output: [ 1, 2, 3, 5 ]


// with Symbol.iterator example two
function* gene(){
  yield 'gene00'
}
const ge = gene();
console.log(ge[Symbol.iterator]());
console.log(ge[Symbol.iterator]().next());
console.log('xxl-result of iterator is equal to object:', ge[Symbol.iterator]() === ge);
// output of above:
// Object [Generator] {}
// { value: 'gene00', done: false }
// xxl-result of iterator is equal to object: true