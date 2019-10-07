const assert = require('assert');
const RecordConverter = require('./index');

const assertThrowsBlankArgumentError = fn => assert.throws(fn, /^TypeError: Blank\/falsy argument$/)
const assertThrowsInvalidRecordConverterArgumentError = fn => assert.throws(fn, /^TypeError: Arguments should be one or more unique non-empty strings$/)
const assertThrowsKeyAtArgumentError = fn => assert.throws(fn, /^TypeError: Accept single non-negative integer as an argument$/)
const assertThrowsIndexOfArgumentError = fn => assert.throws(fn, /^TypeError: Accept single non-empty string as an argument$/)

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

    describe('.keyAt()', () => {
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
    });

    describe('.indexOf()', () => {
      // valid argument - single string
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
    });
  });

});