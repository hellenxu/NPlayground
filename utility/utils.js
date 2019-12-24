const _ = require("lodash");

const merge = (output, ...input) => {
  return _.mergeWith(output, ...input, (outValue, inValue) => {
    return _.isBuffer(inValue) ? inValue : undefined
  })
};

module.exports = {
  merge
};