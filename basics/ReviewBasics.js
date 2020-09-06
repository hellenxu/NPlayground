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