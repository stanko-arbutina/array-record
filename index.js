const { isString, isObject, uniq } = require('lodash');

function ensureNonBlank(obj) {
  if (!obj) {
    throw new TypeError('Blank/falsy argument');
  }
}

function RecordConverter(...keys){
  if ((keys.length == 0) || keys.some(key => !isString(key) || !key) || (uniq(keys).length) < keys.length) {
    throw new TypeError('Arguments should be one or more unique non-empty strings');
  }

  return {
    objectFromArray(arr){
      ensureNonBlank(arr);
      if (!Array.isArray(arr)) {
        throw new TypeError('Argument should be an array');
      }
      const result = {};
      keys.forEach((keyName, index) => result[keyName] = arr[index] || null);
      return result;
    },
    arrayFromObject(obj){
      ensureNonBlank(obj);
      if (!isObject(obj)) {
        throw new TypeError('Argument should be an object');
      }
      return keys.map(keyName => obj[keyName] || null);
    }
  }

}

module.exports = RecordConverter;
