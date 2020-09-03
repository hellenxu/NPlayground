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

// others that using iterator under the hood
// 1,) ... operator;
// 2,) deconstruction and assignment;
// 3,) Array.from
console.log('=== others can receive the iterators generated by generator functions ===');
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
  return 5;
}

console.log(`...:`, [...numbers()]);
const [x, y, z] = numbers();
console.log(`deconstruction: [ ${x}, ${y}, ${z} ]`);
console.log('Array.from: ', Array.from(numbers()));
for (let i of numbers()) {
  console.log(i);
}

// Generator.prototype.throw():
// iterators created by Generator funcs, have a throw method,
// which is able to throw exception caught in generator functions

const throwGen = function* () {
  try {
    yield ;
  }catch (e) {
    console.log('caught exception inside generator functions: ', e);
  }
};

const wrap = throwGen();
wrap.next();

try {
  wrap.throw(new Error('a'));
  wrap.throw(new Error('b'));
}catch (e) {
  console.log('exception outside generator functions: ', e);
}
// output:
// caught exception inside generator functions:  a
// exception outside generator functions:  b


// Generator.prototype.throw() vs. throw command
// exception thrown by throw command, is only caught by try...catch block outside generator functions
const throwGen1 = function* () {
  try {
    yield ;
  }catch (e) {
    if (e !== 'a0') throw e;
    console.log('exception inside generator functions: ', e);
  }
}
const throw1 = throwGen1();
throw1.next();
try {
  throw new Error('a0');
  throw new Error('b0');
}catch (e) {
  console.log('exception outside generator functions: ', e);
}
// output: error b0 wouldn't be caught because code execution is done.
// exception outside generator functions:  Error: a0


// exception: throw exception without try catch inside and outside generator functions
const normalGen = function* () {
  yield console.log('hello');
  yield console.log(111);
};
const throw2 = normalGen();
throw2.next();
// throw2.throw(); // comment for running
// output: uncaught undefined as yield return undefined
//  yield console.log('hello');
//   ^
// undefined


// needs to call next() at least one time before calling Generator.prototype.throw()
const throw3 = throwGen();
// throw3.throw('throw3'); // comment for running
// output: uncaught undefined
// yield console.log('hello');
// ^
// throw3


// throw() will trigger the next()
console.log('==========')
const throwGen4 = function* () {
  try {
    yield console.log('step1');
  } catch (e) {
    console.log('exception inside generator function: ', e);
  }
  yield console.log('step2');
  yield console.log('step3');
}

const throw4 = throwGen4();
throw4.next();
throw4.throw('4');
throw4.next();
// output: with try catch inside generator functions, other yields wouldn't be broken.
// step1
// exception inside generator function:  4
// step2
// step3


// Generator.prototype.return()
const returnGen = normalGen();
console.log(returnGen.next());
console.log(returnGen.return('return'));
console.log(returnGen.next());
// output:
// { value: undefined, done: false }
// { value: 'return', done: true }
// { value: undefined, done: true }


// return() with try...finally inside generator functions
function* returnTryFinally() {
  yield 1;
  try {
    yield 2;
  } finally {
    yield 3;
  }
  yield 4;
}

const returnFinallyGen = returnTryFinally();
console.log(returnFinallyGen.next());
console.log(returnFinallyGen.next());
console.log(returnFinallyGen.return(5));
console.log(returnFinallyGen.next());
// output:
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: 5, done: true }


// nested generator functions
// 1,) if inside a generator function, calling another generator function, then have to iterate the called generator func;
// otherwise, wouldn't get output from the called generator function. e.g. in the case below, a, and b wouldn't print.
// 2,) yield* is used to provide a convenient way to do that.

console.log('=== nested generator functions ===')
function* nested1() {
  yield 'a';
  yield 'b';
}

function* host() {
  yield 'x';
  yield* nested1();
  yield 'y';
}

for (let i of host()) {
  console.log(i);
}