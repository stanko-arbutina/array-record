# array-record

Tiny utility for working with record-like data structures. Extracted from a private project. 

## Installation

`npm install array-record`

## Usage
```
const arrayRecord = require('array-record');
const recordType = arrayRecord('name', 'age', 'address');

recordType.objectFromArray(['Jane', 26, 'My street 15']); // {name: 'Jane', age: 26, address: 'My street 26'}
recordType.arrayFromObject({name: 'Jane', age: 26, address: 'My street 26'}); // ['Jane', 26, 'My street 15']

```
## API
`arrayRecord(...keys)`
`keys` is a list of non-empty strings. Returns new recordType utility object which contains methods and properties listed below.

`recordType.arrayFromObject( object )`
Returns new array which is constructed by projecting properties of `object` in the `keys` order (see above)

`recordType.objectFromArray( array ) `
Constructs new object from provided array by mapping elements to object keys in the order described in `keys`

`recordType.indexOf( key ) `
Returns index of `key` in `keys`

`recordType.keyAt( index ) `
Returns key for index in `keys`

`recordType.keys() `

Returns a copy of `keys` array.

`recordType.length`

Contains number of keys in `keys`

## Testing
Mocha is used for testing. You can run tests with `npm test`.

## Linting
`npm run lint`