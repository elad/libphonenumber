# libphonenumber

## Description
This is a copy of [wajatimur/node-phonenumber](https://github.com/wajatimur/node-phonenumber) with the following changes:

  * Closure is not part of the repository
  * Updating is as simple as typing `make` (assuming [`curl`](http://curl.haxx.se/) is installed)

## Install
    npm install eladxxx/libphonenumber

## Use
```
var libphonenumber = require('libphonenumber');

function format(phone, country, how) {
	var phone_util = libphonenumber.PhoneNumberUtil.getInstance(),
	    phone_number = phone_util.parse(phone, country),
	    fmt;

	how = how ? how.toLowerCase() : 'e164';
	switch (how) {
	case 'international':
	case 'intl':
	case 'global':
		fmt = libphonenumber.PhoneNumberFormat.INTERNATIONAL;
		break;

	case 'national':
	case 'local':
		fmt = libphonenumber.PhoneNumberFormat.NATIONAL;
		break;

	case 'rfc3966':
	case 'url':
		fmt = libphonenumber.PhoneNumberFormat.RFC3966;
		break;

	case 'e164':
	default:
		fmt = libphonenumber.PhoneNumberFormat.E164;
		break;
	}

	return phone_util.format(phone_number, fmt);
}

var s = '555-555-5555',
    country = 'US';

console.log(format(s, country));		// +15555555555
console.log(format(s, country, 'intl'));	// +1 555-555-5555
console.log(format(s, country, 'local'));	// (555) 555-5555
console.log(format(s, country, 'url'));		// tel:+1-555-555-5555
```

## Todo

  * Put the above `format` function in the API

