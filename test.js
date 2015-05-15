var libphonenumber = require('./libphonenumber');

// Human readable to E164
var n = ['212 555-5555', '(212) 555-5555', '212-555-5555', '+1 212-555-5555'];
var c = 'US';
for (var i in n) {
  console.log(n[i] + '\t' + libphonenumber.format(n[i], c));
}

// E164 to human readable
var s = '+12125555555';
var t = ['global', 'local', 'url', 'e164'];
for (var i in t) {
  console.log(t[i] + '\t\t' + libphonenumber.format(s, t[i]));
}

// Utility functions
var s = '+12125555555';
console.log('isValid' + '\t\t' + libphonenumber.isValid(s), libphonenumber.isValid('foo'));
console.log('getCountryCode' + '\t' + libphonenumber.getCountryCode(s));
console.log('getType' + '\t\t' + libphonenumber.getType(s));