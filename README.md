# libphonenumber

## Description
This is libphonenumber ready for use in node.js with instructions on how to keep the data up-to-date.

It's a compact and much easier to update version of [wajatimur/node-phonenumber](https://github.com/wajatimur/node-phonenumber) and [mattbornski/libphonenumber](https://github.com/mattbornski/libphonenumber). (See below...)

## Install
    $ npm install eladxxx/libphonenumber

## Use

    var libphonenumber = require("libphonenumber");

    function format(phone, country, international) {
        var phone_util = libphonenumber.PhoneNumberUtil.getInstance(),
            phone_number = phone_util.parse(phone, country);
        return phone_util.format(phone_number, international ? libphonenumber.PhoneNumberFormat.INTERNATIONAL : libphonenumber.PhoneNumberFormat.NATIONAL);
    }

    var phone = "555-555-5555",
        country = "US";

    format(phone, country, false); // (555) 555-5555
    format(phone, country, true); // +1 555-555-5555

## Note

The API should be better.

## Build
You only have to do this if you want to update the data.

1. Open closure.txt, copy its contents, and paste in [http://closure-compiler.appspot.com/home](http://closure-compiler.appspot.com/home)
2. Click "Compile"
3. Copy the result and paste in libphonenumber.js

## Motivation

    air:tmp elad$ npm install wajatimur/node-phonenumber
    npm http GET https://registry.npmjs.org/closure/1.0.3
    npm http 304 https://registry.npmjs.org/closure/1.0.3
    node-phonenumber@0.1.1 node_modules/node-phonenumber
    └── closure@1.0.3
    air:tmp elad$ npm install mattbornski/libphonenumber
    npm http GET https://registry.npmjs.org/closure/1.0.3
    npm http 304 https://registry.npmjs.org/closure/1.0.3
    libphonenumber@0.0.8 node_modules/libphonenumber
    └── closure@1.0.3
    air:tmp elad$ node test_node-phonenumber.js 555-555-5555 US
    international: +1 555-555-5555 local: 555-555-5555
    air:tmp elad$ node test_libphonenumber.js 555-555-5555 US
    international: +1 555-555-5555 local: 555-555-5555
    air:tmp elad$ du -sh node_modules/node-phonenumber/
     25M	node_modules/node-phonenumber/
    air:tmp elad$ du -sh node_modules/libphonenumber/
     17M	node_modules/libphonenumber/
    air:tmp elad$ 

Whereas:

    air:tmp elad$ npm install eladxxx/libphonenumber
    libphonenumber@0.0.0 node_modules/libphonenumber
    air:tmp elad$ node test_libphonenumber_elad.js 555-555-5555 US
    international: +1 555-555-5555 local: (555) 555-5555
    air:tmp elad$ du -sh node_modules/libphonenumber/
    380K	node_modules/libphonenumber/
    air:tmp elad$ 
