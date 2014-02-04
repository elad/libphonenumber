# libphonenumber

## Description
This is libphonenumber ready for use in node.js with instructions on how to keep the data up-to-date.

In other words it's a compact version of [wajatimur/node-phonenumber](https://github.com/wajatimur/node-phonenumber)

## Install
    npm install eladxxx/libphonenumber

## Build
You only have to do this if you want to update the data.

1. Open closure.txt, copy its contents, and paste in [http://closure-compiler.appspot.com/home](http://closure-compiler.appspot.com/home)
2. Click "Compile"
3. Copy the result and paste in libphonenumber.js

## Use

    var libphonenumber = require("libphonenumber");

    function format(phone, country, international) {
        var phone_util = libphonenumber.PhoneNumberUtil.getInstance(),
            phone_number = phone_util.parse(phone, country);
        return phone_util.format(phone_number, international ? libphonenumber.PhoneNumberFormat.INTERNATIONAL : libphonenumber.PhoneNumberFormat.NATIONAL);
    }

    var phone = "555-555-5555",
        country = "US";

    console.log(format(phone, country, false)); // (555) 555-5555
    console.log(format(phone, country, true)); // +1 555-555-5555

## Note

The API could be better but I don't have time at the moment to deal with it.
