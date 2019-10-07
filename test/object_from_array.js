const assert = require('assert');
const assertThrowsBlankArgumentError = fn => assert.throws(fn, /^TypeError: Blank\/falsy argument$/)

module.exports = (converter) => {
    describe('Valid arguments', () => {
        it('Works correctly for correct number of arguments', () => {
            assert.deepStrictEqual(converter.objectFromArray(['John', 24, 'New street 18']), {
                    name: 'John', age: 24, address: 'New street 18'
                }
            );
        });
        it('Sets null values for missing columns', () => {
            assert.deepStrictEqual(converter.objectFromArray(['Jane', 23]), {
                name: 'Jane', age: 23, address: null
            });
        });
        it('Ignores extra columns', () => {
            assert.deepStrictEqual(converter.objectFromArray(['Eve', 30, 'New street 19', 'Extra column']), {
                name: 'Eve', age: 30, address: 'New street 19'
            });
        });
    });

    describe('Invalid arguments', () => {
        it('Throws a TypeError if no is argument provided', () => {
            assertThrowsBlankArgumentError(() => converter.objectFromArray());
        });
        it('Throws a TypeError if non-array argument provided', () => {
            assert.throws(() => converter.objectFromArray('ASD'), /^TypeError: Argument should be an array$/)
        })
    });
};