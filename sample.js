
// scope example
var change = function (a) {
    a = 100
    console.log(a)
};

var a = 10
change(a)
console.log(a)

// module.exports vs exports
var module = {
    exports: {
        name: "module->exports attribute"
    }
}

var exports = module.exports

console.log("module exports attribute: ", module.exports)
console.log("module.exports: ", exports)
/*
result will be:
module exports attribute:  { name: 'module->exports attribute' }
module.exports:  { name: 'module->exports attribute' }
 */

exports = require ('./module_path.js');

console.log(module.exports)
console.log(exports.method())