const { isString, isObject, uniq, isInteger } = require('lodash');

function ensureNonBlank(obj) {
  if (!obj) {
    throw new TypeError('Blank/falsy argument');
  }
}

function ensureNoArguments(arguments){
  if (arguments.length) {
    throw new TypeError('Should be called without arguments');
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
    },
    keyAt(index) {
      if ((arguments.length != 1) || (!isInteger(index)) || (index < 0)) {
        throw new TypeError('Accept single non-negative integer as an argument');
      }

      return keys[index] || null;
    },
    indexOf(key){
      if ((arguments.length != 1) || (!isString(key)) || (!key.length)) {
        throw new TypeError('Accept single non-empty string as an argument');
      }
      const indexOf = keys.indexOf(key);
      if (indexOf >= 0) return indexOf;
      return null;
    },
    keys(){
      ensureNoArguments(arguments);
      return keys.slice(0);
    },
    keyIndexMap(){
      ensureNoArguments(arguments);
      const toReturn = new Map();
      keys.forEach((key, index) => toReturn.set(key, index));
      return toReturn;
    }
  }

}

module.exports = RecordConverter;
