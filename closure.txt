// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name default.js
// @use_closure_library true
// @code_url https://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers/asyoutypeformatter.js
// @code_url https://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers/phonenumberutil.js
// @code_url https://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers/regioncodefortesting.js
// @code_url https://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers/phonemetadata.pb.js
// @code_url https://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers/metadata.js
// @code_url https://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers/phonenumber.pb.js
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

var e164 = function (number, countryCode, callback) {
  return formatNumber(number, countryCode, PhoneNumberFormat.E164, callback);
};

var intl = function(number, countryCode, callback) {
  return formatNumber(number, countryCode, PhoneNumberFormat.INTERNATIONAL, callback);
};

module.exports = i18n.phonenumbers;
