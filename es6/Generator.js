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