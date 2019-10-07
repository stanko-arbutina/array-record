const assert = require('assert');
const RecordConverter = require('../index');

const assertThrowsInvalidRecordConverterArgumentError = fn => assert.throws(fn, /^TypeError: Arguments should be one or more unique non-empty strings$/)
module.exports = () => {
    it('Throws a TypeError when called without arguments', () => {
        assertThrowsInvalidRecordConverterArgumentError(() => RecordConverter());
    });
    it('Throws a TypeError when called with non-string arguments', () => {
        assertThrowsInvalidRecordConverterArgumentError(() => RecordConverter(1,2));
    });
    it('Throws a TypeError when called with empty string arguments', () => {
        assertThrowsInvalidRecordConverterArgumentError(() => RecordConverter('one','', 'bla'));
    });
    it('Throws a TypeError when called with duplicate arguments', () => {
        assertThrowsInvalidRecordConverterArgumentError(() => RecordConverter('one', 'two', 'one'));
    });
};


