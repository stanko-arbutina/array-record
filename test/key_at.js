const assert = require('assert');
const assertThrowsKeyAtArgumentError = fn => assert.throws(fn, /^TypeError: Accept single non-negative integer as an argument$/)

module.exports = (converter) => {
    it('Throws error if no arguments provided', () => {
        assertThrowsKeyAtArgumentError(() => converter.keyAt())
    });
    it('Throws error if multiple arguments provided', () => {
        assertThrowsKeyAtArgumentError(() => converter.keyAt(2,3))
    });
    it('Throws error if string argument provided', () => {
        assertThrowsKeyAtArgumentError(() => converter.keyAt('one'))
    });
    it('Throws error if float argument provided', () => {
        assertThrowsKeyAtArgumentError(() => converter.keyAt(3.2))
    });
    it('Throws error if negative argument provided', () => {
        assertThrowsKeyAtArgumentError(() => converter.keyAt(-5))
    });
    it('Returns null if index is too big', () => {
        assert.equal(converter.keyAt(5), null);
    });
    it('Key for provided index if it exists', () => {
        assert.equal(converter.keyAt(2), 'address');
    });
};