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


//notes of global
/*
* browser: top level object is window, but node and web worker doesn't have it;
* browser && web worker: self is pointed to top level object, but node doesn't have it;
* node: global is the top level object, but it doesn't exist in other environment
* that why in ES2020, globalThis is introduced.
* */
global.a = 1
console.log(`xxl-global-a: ${global.a}`)
a = 2
console.log(`xxl-global-a: ${global.a}`)


//destructuring examples
let [head, ...tail] = [1,3,5,7]
console.log(`xxl-head: ${head}; tail: ${tail}`)

const [x, y, ...z] = ['a']
console.log(`xxl-x: ${x}; y: ${y}; z: ${z}`)

let { bar,foo1 } = {foo1: 'aaa', bar: 'bbb'}
console.log(`xxl-foo: ${foo1}; bar: ${bar}`)

let { log, sin, cos } = Math
console.log(`xxl-math-log: ${log(10)}; sin: ${sin(1)}; cos: ${cos(0.5)}`)

let { log: log1 } = console
log1('hiii...')

const obj00 = {}
const obj11 = { foo: 'bzzz~' }
Object.setPrototypeOf(obj00, obj11)
const { foo: f0 } = obj11
console.log(`xxl-object-inherit: ${f0}`)

const { x: x1 = 3 } = { x: undefined}
const { y: y1 = 3 } = { y: null}
console.log(`xxl-x1: ${x1}; y1: ${y1}`)

const ary = [1, 2, 3]

// 使用in会输出数组的index，而使用of则会输出数组的value
for(let i in ary){
  console.log(i)
}

let x2
({ x2 } = { x2: 0})

let [a1, b1, c1, d1, e1] = 'hello'
console.log(`xxl-str: a = ${a1}; b = ${b1}; c = ${c1}; d = ${d1}; e = ${e1}`)

const { length: len0 } = 'hello'
console.log(`xxl-len: ${len0}`)

const { toString: s } = 2994
console.log(`xxl-num-des: ${ s === Number.prototype.toString}; s = ${s}`)
const { toString: s1 } = true
console.log(`xxl-bool-des: ${ s1 === Boolean.prototype.toString}; s = ${s1}`)

function mmove({x, y} = { x: 0, y: 0 }) {
  return [x, y]
}
console.log(`xxl-func-des: ${mmove()}`)
console.log(`xxl-func-des1: ${mmove({x: 10, y: 20})}`)

console.log(`${'\z' === 'z'}`)
console.log(`${'\172' === 'z'}`)
console.log(`${'\x7A' === 'z'}`)
console.log(`${'\u007A' === 'z'}`)
console.log(`${"\u{7A}" === 'z'}`)

const txt = String.fromCodePoint(0x20bb7)
for (let i = 0; i < txt.length; i ++) {
  console.log(`for: ${txt[i]}`)
}

for (let i of txt) {
  console.log(`for...of: ${i}`)
}
// Results of above
// for: �
// for: �
// for...of: 𠮷

console.log(`xxl-special-unicode: \u005c`)
console.log(`xxl-special-unicode: ${JSON.stringify('\u005c')}`)
// console.log(`xxl-special-unicode: ${JSON.parse('\u005c')}`)

console.log(`xxl-stirngify: ${JSON.stringify('\u{d834}')}`)
console.log(`xxl-stirngify: ${JSON.stringify('\ud834\udf06')}`)

function compile(template) {
// have done 2 things:
// 1,) replace script tags;
// 2,) return an appending function for eval to verify and execute

  const evalExpr = /<%=(.+?)%>/g
  const expr = /<%([\s\S]+?)%>/g
  template = template
    .replace(evalExpr, '`); \n echo( $1 ); \n echo(`')
    .replace(expr, '`); \n $1 \n echo(`')
  template = 'echo(`' + template + '`);'

  return `(function parse(data){
      let output = ""
      
      function echo(html) {
        output += html
      }
      
      ${template}
      return output
    })`
}

let template = `
<ul>
<% for(let i = 0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
<% } %>    
</ul>
`

let parse = eval(compile(template))
console.log(`xxl-template-string: ${parse({ supplies: ["broom", "mop", "cleaner"] })}`)