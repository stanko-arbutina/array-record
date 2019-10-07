const assert = require('assert');
const assertThrowsBlankArgumentError = fn => assert.throws(fn, /^TypeError: Blank\/falsy argument$/)

module.exports = (converter) => {
    describe('Valid arguments', () => {
        it('Works correctly for objects with exact keys', () => {
            assert.deepStrictEqual(converter.arrayFromObject({
                    name: 'John', age: 24, address: 'New street 18'
                }
            ), ['John', 24, 'New street 18']);
        });
        it('Sets null value for missing keys', () => {
            assert.deepStrictEqual(converter.arrayFromObject({
                name: 'Jane', address: 'Some'
            }), ['Jane', null, 'Some']);
        });
        it('Ignores extra keys', () => {
            assert.deepStrictEqual(converter.arrayFromObject({
                name: 'Eve', age: 30, address: 'New street', newKey: 12
            }), ['Eve', 30, 'New street']);
        });
    });
    describe('Invalid arguments', () => {
        it('Throws a TypeError if no argument provided', () => {
            assertThrowsBlankArgumentError(() => converter.arrayFromObject());
        });
        it('Throws a TypeError if non-array argument provided', () => {
            assert.throws(() => converter.arrayFromObject('ASD'), /^TypeError: Argument should be an object/)
        });
        it('Throws a TypeError if null argument provided', () => {
            assertThrowsBlankArgumentError(() => converter.arrayFromObject(null));
        });
    });
};
