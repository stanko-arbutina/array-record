const assert = require('assert');
const assertThrowsOnArgumentsError = require('./helpers/asset_throws_on_arguments');

module.exports = (converter) => {
    describe('Invalid arguments', () => {
        it('Throws error if arguments provided', () => {
            assertThrowsOnArgumentsError(() => converter.keys('bla'))
        });
    });

    describe('Valid arguments', () => {
        it('Returns an array containing keys in original order', () => {
            assert.deepEqual(converter.keys(), ['name', 'age', 'address']);
        });

        it('Always returns a new array', () => {
            const returned = converter.keys();
            returned.splice(0, 2);
            assert.deepEqual(converter.keys(), ['name', 'age', 'address']);
        });
    });
};