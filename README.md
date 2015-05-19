# libphonenumber

## Install
    npm install libphonenumber-node

## Use

```js
var libphonenumber = require('libphonenumber-node');

// Human readable to E164. All of these will print +12125555555.
// The country code is necessary if our input has local numbers.
console.log(libphonenumber.format('212 555-5555', 'US'));
console.log(libphonenumber.format('(212) 555-5555', 'US'));
console.log(libphonenumber.format('212-555-5555', 'US'));
console.log(libphonenumber.format('+1 212-555-5555', 'US'));

// E164 to human readable.
console.log(libphonenumber.format('+12125555555', 'global')); // +1 212-555-5555
console.log(libphonenumber.format('+12125555555', 'local')); // (212) 555-5555
console.log(libphonenumber.format('+12125555555', 'url')); // tel:+1-212-555-5555
console.log(libphonenumber.format('+12125555555', 'e164')); // +12125555555

// Utility functions
console.log(libphonenumber.isValid('+12125555555')); // true
console.log(libphonenumber.isValid('foo')); // false
console.log(libphonenumber.getCountryCode('+12125555555')); // US
console.log(libphonenumber.getType('+12125555555')); // FIXED_LINE_OR_MOBILE
```

## Update

Typing `make` should sync the code with the latest official [libphonenumber](https://github.com/googlei18n/libphonenumber).
