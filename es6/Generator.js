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

const yieldRe = yieldInOtherExpression();
console.log(yieldRe.next());
console.log(yieldRe.next());
console.log(yieldRe.next());

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

// change function behaviors from outside
function* loopFun() {
  for (let i = 0; true; i ++) {
    let reset = yield i;
    console.log(`xxl-reset: `, reset, i)
    let second = yield i + 1;
    console.log(`xxl-second: `, second, i)
    if (reset) { i = -1;}
  }
}
const loop = loopFun();
console.log(loop.next());
console.log(loop.next());
console.log(loop.next());
console.log(loop.next(true));
console.log(loop.next());
console.log(loop.next());
console.log(loop.next());
// output 1:
// calling next() with param true, meaning setting the return value of last yield to true, that's reset = true in this case,
// so i is reset to -1, and then increase to 0, then run yield again, that's why the output value is 0.
// { value: 0, done: false }
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: 0, done: false }
// { value: 1, done: false }

// output 2:
// from the output, we can tell that
// 1,) calling next() with param means the returning value of last yield expression.
// 2,) yield: if no return keyword, then the value of yield expression will be undefined.
// 3,) it's useless to pass param when calling next() for the first time as it means the returning value of last yield expression,
// but there is no yield expression in this case.
// { value: 0, done: false }
// xxl-reset:  undefined 0
// { value: 1, done: false }
// xxl-second:  undefined 0
// { value: 1, done: false }
// xxl-reset:  true 1
// { value: 2, done: false }
// xxl-second:  undefined 1
// { value: 0, done: false }
// xxl-reset:  undefined 0
// { value: 1, done: false }
// xxl-second:  undefined 0
// { value: 1, done: false }


// next() with param example two
function* sumOfThree(x) {
  const y = 2 * (yield (x + 1));
  const z = yield (y / 3);
  console.log(`xxl-z-y-x:`, z, y, x);
  return (x + y + z);
}
console.log('=========')
const ff = sumOfThree(5);
console.log('example one: x = 5; z = 10; y = NaN')
console.log(ff.next()); // {value: 6, done: false}
console.log(ff.next()); // {value: NaN, done: false}
console.log(ff.next(10)); // {value: NaN, done: true}

console.log('example two: x = 5; z = 10; y = 30')
const f2 = sumOfThree(5);
console.log(f2.next()); // {value: 6, done: false}
console.log(f2.next(15)); // {value: 10, done: false}
console.log(f2.next(10)); // {value: 45, done: true}

// next() with param example three: no return value
function* consumer() {
  console.log('Started');
  console.log(`1. ${yield }`);
  console.log(`2. ${yield }`);
}

console.log('=========')
const c = consumer();
console.log(c.next());
console.log(c.next('a'));
console.log(c.next('bb'));
// output:
// Started
// { value: undefined, done: false }
// 1. a
// { value: undefined, done: false }
// 2. bb
// { value: undefined, done: true }

// use for ... of to iterate the iterator created by Generator functions
// for ... of will stop if done is true
function* foo2() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}
console.log('=== use for of to replace next ===')
for (let item of foo2()) {
  console.log(item);
}

// use generator function to implement fibonacci
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for(;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

console.log('=== fibonacci ===')
let fibRe = ''
for (let i of fibonacci()) {
  if(i > 600) break;
  fibRe = `${fibRe} ${i}`;
}
console.log(fibRe);

//two methods to make sure js object has the ability to be iterated
//1,) pass object to a generator function;
//2,) pass a generator function to Symbol.iterator of an object.
console.log('=== enpower objects to be iterated ===');
function* objectEntries(obj) {
  const keys = Object.keys(obj);
  for (let key of keys) {
    yield [key, obj[key]];
  }
}
console.log('1,) method one: pass objects to a generator function.')
const john = {name: 'John Smith', age: 30, occupation: 'dentist'};
for (let [key, value] of objectEntries(john)) {
  console.log(`${key}: ${value}`);
}
console.log('2,) method two: pass a generator function to Symbol.iterator.')
function* objectEntries2() {
  const keys = Object.keys(this);
  for (let key of keys) {
    yield [key, this[key]];
  }
}
john[Symbol.iterator] = objectEntries2; // attention: it's function name, not calling functions.
for (let [key, value] of john) {
  console.log(`${key}: ${value}`);
}
