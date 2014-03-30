# libphonenumber

## Description
This is a copy of [wajatimur/node-phonenumber](https://github.com/wajatimur/node-phonenumber) with the following changes:

  * Closure is not part of the repository
  * Updating is as simple as typing `make` (assuming [`curl`](http://curl.haxx.se/) is installed)

## Install
    npm install eladxxx/libphonenumber

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

## Todo

  * Better API

