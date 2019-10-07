const assert = require('assert');
const assertThrowsIndexOfArgumentError = fn => assert.throws(fn, /^TypeError: Accept single non-empty string as an argument$/)

module.exports = (converter) => {
    it('Throws error if no arguments provided', () => {
        assertThrowsIndexOfArgumentError(() => converter.indexOf())
    });
    it('Throws error if multiple arguments provided', () => {
        assertThrowsIndexOfArgumentError(() => converter.indexOf('age', 'address'))
    });
    it('Throws error if integer argument provided', () => {
        assertThrowsIndexOfArgumentError(() => converter.indexOf(2))
    });
    it('Throws error if empty string argument provided', () => {
        assertThrowsIndexOfArgumentError(() => converter.indexOf(''))
    });
    it('Returns null if called with non-existing key', () => {
        assert.equal(converter.indexOf('street'), null);
    });
    it('Returns index of existing key', () => {
        assert.equal(converter.indexOf('address'), 2);
    });
};