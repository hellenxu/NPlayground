exports = {
    name: "exports: to iterate module paths", 
    method: function() {
        console.log(module.paths)
    }
}

module.exports = {
    name: "module.exports: to iterate module paths",
    method: function() {
        console.log(module.paths)
    }
}