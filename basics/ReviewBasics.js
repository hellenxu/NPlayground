function func(arg) {
  {
    let arg = 10
    console.log(`nested arg: ${arg}`)
  }
  console.log(`outside arg: ${arg}`)
}

func(18)

var tmp = new Date()
function f() {
  console.log(`tmp: ${tmp}`)
  if (false) {
    var tmp = 'hello world'
    console.log(`new tmp: ${tmp}`)
  }
}
f()
// output:
// tmp: undefined

function f1() {
  let n = 5
  if (true) {
    let n = 10
  }
  console.log(`${n}`)
}
f1()

function f2() {
  console.log(`xxl-outside`);
}

(function() {
  if (false) {
    function f2() { console.log(`xxl-inside`) }
  }
  // f2()
}());
// output:
// /Users/xxl/code/NPlayground/basics/ReviewBasics.js:40
// f2()
// ^
//
// TypeError: f2 is not a function
// at /Users/xxl/code/NPlayground/basics/ReviewBasics.js:40:3
// at Object.<anonymous> (/Users/xxl/code/NPlayground/basics/ReviewBasics.js:41:2)

// Reason: the definition of f2 will be moved up in ES6 environment, and became the followings:
// function f2() { console.log(`xxl-outside`) }
// (function() {
//   var f2 = undefined
//   if (false) {
//     function f2() { console.log(`xxl-inside`) }
//   }
//   f2()
// }())


// object freeze example
const foo = Object.freeze({})
foo.id = '123'
console.log(`xxl-id: ${foo.id}`)

global.a = 1
console.log(`xxl-global-a: ${global.a}`)
a = 2
console.log(`xxl-global-a: ${global.a}`)
