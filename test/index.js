const RecordConverter = require('../index');

describe('RecordConverter', () => {
  describe('RecordConverter() accepts only list of unique non-empty strings as arguments', require('./constructor_arguments'));
  describe("converter = RecordConverter('name', 'age', 'address')", () => {
    const converter = RecordConverter('name', 'age', 'address');
    describe('.objectFromArray()', () => require('./object_from_array')(converter));
    describe('.arrayFromObject()', () => require('./array_from_object')(converter));
    describe('.keyAt()', () => require('./key_at')(converter));
    describe('.indexOf()', () => require('./index_of')(converter));
    describe('.keys()', () => require('./keys')(converter));
    describe('.keyIndexMap()', () => require('./key_index_map')(converter));
  });

});