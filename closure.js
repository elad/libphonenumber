// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name default.js
// @use_closure_library true
// @code_url https://raw.githubusercontent.com/googlei18n/libphonenumber/master/javascript/i18n/phonenumbers/asyoutypeformatter.js
// @code_url https://raw.githubusercontent.com/googlei18n/libphonenumber/master/javascript/i18n/phonenumbers/phonenumberutil.js
// @code_url https://raw.githubusercontent.com/googlei18n/libphonenumber/master/javascript/i18n/phonenumbers/regioncodefortesting.js
// @code_url https://raw.githubusercontent.com/googlei18n/libphonenumber/master/javascript/i18n/phonenumbers/phonemetadata.pb.js
// @code_url https://raw.githubusercontent.com/googlei18n/libphonenumber/master/javascript/i18n/phonenumbers/metadata.js
// @code_url https://raw.githubusercontent.com/googlei18n/libphonenumber/master/javascript/i18n/phonenumbers/phonenumber.pb.js
// ==/ClosureCompiler==

goog.require('goog.dom');
goog.require('goog.json');
goog.require('goog.proto2.ObjectSerializer');
goog.require('goog.string.StringBuffer');
goog.require('i18n.phonenumbers.AsYouTypeFormatter');
goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberType');
goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');


var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
var PhoneNumberFormat = i18n.phonenumbers.PhoneNumberFormat;
var ValidationResult = i18n.phonenumbers.PhoneNumberUtil.ValidationResult;
var ValidationErrors = i18n.phonenumbers.Error;

var formatNumber = function (number, countryCode, numberFormat, callback) {
  var error = null;
  var result = null;
  
  // Strip out everything that's not a phone number.
  if (number) {
    var potentialPhoneNumber = number.toString();
    potentialPhoneNumber = potentialPhoneNumber.replace(/[^\+0-9]/, '');
    // E164 format numbers start with a plus sign.  If you have a plus sign
    // anywhere else, this is not a phone number.  If you don't have a plus
    // sign yet, don't worry, we'll give you one.
    if (potentialPhoneNumber.lastIndexOf('+') <= 0) {
      try {
        potentialPhoneNumber = phoneUtil.parse(potentialPhoneNumber, countryCode);
        var quickReason = phoneUtil.isPossibleNumberWithReason(potentialPhoneNumber);
        if (quickReason !== ValidationResult.IS_POSSIBLE) {
          for (var code in ValidationResult) {
            if (ValidationResult[code] === quickReason) {
              error = new Error(ValidationErrors[code]);
            }
          }
          if (error === null) {
            error = new Error('Invalid number (unspecified reason)');
          }
        } else {
          if (phoneUtil.isValidNumber(potentialPhoneNumber)) {
            result = phoneUtil.format(potentialPhoneNumber, numberFormat);
          } else {
            error = new Error('Invalid number');
          }
        }
      } catch (e) {
        error = e;
      }
    } else {
      error = new Error('Not a phone number');
    }
  } else {
    error = new Error('No number given');
  }
  if (callback) {
    callback(error, result);
  } else if (error) {
    throw error;
  } else {
    return result;
  }
};

var isValid = function(phone, countryCode) {
  try {
    var phone_number = phoneUtil.parseAndKeepRawInput(phone, countryCode);
    return phoneUtil.isValidNumber(phone_number);
  } catch (ex) {
    return false;
  }
}

var getCountryCode = function(phone) {
  try {
    var phone_number = phoneUtil.parseAndKeepRawInput(phone);
    return phoneUtil.getRegionCodeForNumber(phone_number);
  } catch (ex) {
    return null;
  }
}

// Guess the type of a number. Returns one of the following:
//   'FIXED_LINE'
//   'MOBILE'
//   'FIXED_LINE_OR_MOBILE'
//   'TOLL_FREE'
//   'PREMIUM_RATE'
//   'SHARED_COST'
//   'VOIP'
//   'PERSONAL_NUMBER'
//   'PAGER'
//   'UAN'
//   'VOICEMAIL'
//   'UNKNOWN'
var getType = function(phone, countryCode) {
  try {
    var phone_number = phoneUtil.parseAndKeepRawInput(phone, countryCode);
    var phone_number_type = phoneUtil.getNumberType(phone_number);
    for (var k in i18n.phonenumbers.PhoneNumberType) {
      if (i18n.phonenumbers.PhoneNumberType[k] == phone_number_type)
        return k;
    }
    throw null;
  } catch (ex) {
    return 'UNKNOWN';
  }
}

var getFormat = function(how) {
  how = how ? how.toLowerCase() : 'e164';
  switch (how) {
  case 'international':
  case 'intl':
  case 'global':
      return PhoneNumberFormat.INTERNATIONAL;

  case 'national':
  case 'local':
      return PhoneNumberFormat.NATIONAL;

  case 'rfc3966':
  case 'url':
      return PhoneNumberFormat.RFC3966;

  case 'e164':
      return PhoneNumberFormat.E164;

  default:
      return null;
  }
}

var format = function(phone, countryCode, how) {
  try {
    if (countryCode && countryCode.length > 2) {
      how = countryCode;
      countryCode = undefined;
    }

    var phone_number = phoneUtil.parseAndKeepRawInput(phone, countryCode);
    var fmt = getFormat(how);
    return fmt === null ? null : phoneUtil.format(phone_number, fmt);
  } catch (ex) {
    return null;
  }
}

module.exports = {
  format: format,
  getCountryCode: getCountryCode,
  isValid: isValid,
  getType: getType,
  PhoneUtil: phoneUtil,
  PhoneNumberFormat: PhoneNumberFormat,
  'i18n.phonenumbers': i18n.phonenumbers
};
