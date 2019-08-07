
// scope example
const change = function (a) {
    a = 100;
    console.log(a)
};

const a = 10;
change(a);
console.log(a);

// module.exports vs exports
const module1 = {
    exports: {
        name: "module->exports attribute"
    }
};

exports = module1.exports;

console.log("module exports attribute: ", module1.exports);
console.log("module.exports: ", exports);
/*
result will be:
module exports attribute:  { name: 'module->exports attribute' }
module.exports:  { name: 'module->exports attribute' }
 */

exports = require ('./module_path.js');

console.log("module exports attribute: ", module1.exports);
console.log("exports.method: ", exports);
console.log("exports.exports: ", exports.exports);
/*
result will be:
module exports attribute:  { name: 'module->exports attribute' }
module.exports:  { name: 'module->exports attribute' }
module exports attribute:  { name: 'module->exports attribute' }
exports.method:  { name: 'module.exports: to iterate module paths',
  method: [Function: method] }
exports.exports:  undefined
 */