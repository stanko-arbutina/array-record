const assert = require('assert');
const assertThrowsKeysArgumentError = fn => assert.throws(fn, /^TypeError: Should be called without arguments$/);

module.exports = (converter) => {
    it('Throws error if arguments provided', () => {
        assertThrowsKeysArgumentError(() => converter.keys('bla'))
    });

    it('Returns an array containing keys in original order', () => {
        assert.deepEqual(converter.keys(), ['name', 'age', 'address']);
    });

    it('Always returns a new array', () => {
        const returned = converter.keys();
        returned.splice(0,2);
        assert.deepEqual(converter.keys(), ['name', 'age', 'address']);
    });
};