const assert = require('assert');
module.exports = fn => assert.throws(fn, /^TypeError: Should be called without arguments$/);

