const assert = require('assert');
const RecordConverter = require('./index');

const assertThrowsBlankArgumentError = fn => assert.throws(fn, /^TypeError: Blank\/falsy argument$/)
const assertThrowsInvalidRecordConverterArgumentError = fn => assert.throws(fn, /^TypeError: Arguments should be one or more unique non-empty strings$/)

describe('RecordConverter', () => {

  describe('RecordConverter() accepts only list of uniwue non-empty strings as arguments', () => {
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
  });

  describe("converter = RecordConverter('name', 'age', 'address')", () => {
    const converter = RecordConverter('name', 'age', 'address');
    describe('.objectFromArray()', () => {
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

    });

    describe('.arrayFromObject()', () => {
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
    })
  });

});