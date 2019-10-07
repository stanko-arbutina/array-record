const assert = require('assert');

module.exports = (converter) => {
    it('Returns key array length', () => {
        assert.equal(converter.length, 3);
    });
};