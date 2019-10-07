const { isMap } = require('lodash');

const assert = require('assert');
const assertThrowsOnArgumentsError = require('./helpers/asset_throws_on_arguments');

module.exports = (converter) => {
    describe('Invalid arguments', () => {
        it('Throws error if arguments provided', () => {
            assertThrowsOnArgumentsError(() => converter.keyIndexMap('bla'))
        });
    });

    describe('Valid arguments', () => {
        it('Returns a map mapping record keys to indices', () => {
            const returned = converter.keyIndexMap();
            assert.equal(isMap(returned), true);
            assert.equal(returned.size, 3);
            assert.equal(returned.get('name'), 0);
            assert.equal(returned.get('age'), 1);
            assert.equal(returned.get('address'), 2);
        });
    });
};