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

var ccISO2toISO3 = {
    "AD": "AND", // Andorra
    "AE": "ARE", // United Arab Emirates
    "AF": "AFG", // Afghanistan
    "AG": "ATG", // Antigua and Barbuda
    "AI": "AIA", // Anguilla
    "AL": "ALB", // Albania
    "AM": "ARM", // Armenia
    "AO": "AGO", // Angola
    "AQ": "ATA", // Antarctica
    "AR": "ARG", // Argentina
    "AS": "ASM", // American Samoa
    "AT": "AUT", // Austria
    "AU": "AUS", // Australia
    "AW": "ABW", // Aruba
    "AX": "ALA", // Åland Islands
    "AZ": "AZE", // Azerbaijan
    "BA": "BIH", // Bosnia and Herzegovina
    "BB": "BRB", // Barbados
    "BD": "BGD", // Bangladesh
    "BE": "BEL", // Belgium
    "BF": "BFA", // Burkina Faso
    "BG": "BGR", // Bulgaria
    "BH": "BHR", // Bahrain
    "BI": "BDI", // Burundi
    "BJ": "BEN", // Benin
    "BL": "BLM", // Saint Barthélemy
    "BM": "BMU", // Bermuda
    "BN": "BRN", // Brunei Darussalam
    "BO": "BOL", // Bolivia, Plurinational State of
    "BQ": "BES", // Bonaire, Sint Eustatius and Saba
    "BR": "BRA", // Brazil
    "BS": "BHS", // Bahamas
    "BT": "BTN", // Bhutan
    "BV": "BVT", // Bouvet Island
    "BW": "BWA", // Botswana
    "BY": "BLR", // Belarus
    "BZ": "BLZ", // Belize
    "CA": "CAN", // Canada
    "CC": "CCK", // Cocos (Keeling) Islands
    "CD": "COD", // Congo, the Democratic Republic of the
    "CF": "CAF", // Central African Republic
    "CG": "COG", // Congo
    "CH": "CHE", // Switzerland
    "CI": "CIV", // Côte d'Ivoire
    "CK": "COK", // Cook Islands
    "CL": "CHL", // Chile
    "CM": "CMR", // Cameroon
    "CN": "CHN", // China
    "CO": "COL", // Colombia
    "CR": "CRI", // Costa Rica
    "CU": "CUB", // Cuba
    "CV": "CPV", // Cabo Verde
    "CW": "CUW", // Curaçao
    "CX": "CXR", // Christmas Island
    "CY": "CYP", // Cyprus
    "CZ": "CZE", // Czech Republic
    "DE": "DEU", // Germany
    "DJ": "DJI", // Djibouti
    "DK": "DNK", // Denmark
    "DM": "DMA", // Dominica
    "DO": "DOM", // Dominican Republic
    "DZ": "DZA", // Algeria
    "EC": "ECU", // Ecuador
    "EE": "EST", // Estonia
    "EG": "EGY", // Egypt
    "EH": "ESH", // Western Sahara
    "ER": "ERI", // Eritrea
    "ES": "ESP", // Spain
    "ET": "ETH", // Ethiopia
    "FI": "FIN", // Finland
    "FJ": "FJI", // Fiji
    "FK": "FLK", // Falkland Islands (Malvinas)
    "FM": "FSM", // Micronesia, Federated States of
    "FO": "FRO", // Faroe Islands
    "FR": "FRA", // France
    "GA": "GAB", // Gabon
    "GB": "GBR", // United Kingdom
    "GD": "GRD", // Grenada
    "GE": "GEO", // Georgia
    "GF": "GUF", // French Guiana
    "GG": "GGY", // Guernsey
    "GH": "GHA", // Ghana
    "GI": "GIB", // Gibraltar
    "GL": "GRL", // Greenland
    "GM": "GMB", // Gambia
    "GN": "GIN", // Guinea
    "GP": "GLP", // Guadeloupe
    "GQ": "GNQ", // Equatorial Guinea
    "GR": "GRC", // Greece
    "GS": "SGS", // South Georgia and the South Sandwich Islands
    "GT": "GTM", // Guatemala
    "GU": "GUM", // Guam
    "GW": "GNB", // Guinea-Bissau
    "GY": "GUY", // Guyana
    "HK": "HKG", // Hong Kong
    "HM": "HMD", // Heard Island and McDonald Islands
    "HN": "HND", // Honduras
    "HR": "HRV", // Croatia
    "HT": "HTI", // Haiti
    "HU": "HUN", // Hungary
    "ID": "IDN", // Indonesia
    "IE": "IRL", // Ireland
    "IL": "ISR", // Israel
    "IM": "IMN", // Isle of Man
    "IN": "IND", // India
    "IO": "IOT", // British Indian Ocean Territory
    "IQ": "IRQ", // Iraq
    "IR": "IRN", // Iran, Islamic Republic of
    "IS": "ISL", // Iceland
    "IT": "ITA", // Italy
    "JE": "JEY", // Jersey
    "JM": "JAM", // Jamaica
    "JO": "JOR", // Jordan
    "JP": "JPN", // Japan
    "KE": "KEN", // Kenya
    "KG": "KGZ", // Kyrgyzstan
    "KH": "KHM", // Cambodia
    "KI": "KIR", // Kiribati
    "KM": "COM", // Comoros
    "KN": "KNA", // Saint Kitts and Nevis
    "KP": "PRK", // Korea, Democratic People's Republic of
    "KR": "KOR", // Korea, Republic of
    "KW": "KWT", // Kuwait
    "KY": "CYM", // Cayman Islands
    "KZ": "KAZ", // Kazakhstan
    "LA": "LAO", // Lao People's Democratic Republic
    "LB": "LBN", // Lebanon
    "LC": "LCA", // Saint Lucia
    "LI": "LIE", // Liechtenstein
    "LK": "LKA", // Sri Lanka
    "LR": "LBR", // Liberia
    "LS": "LSO", // Lesotho
    "LT": "LTU", // Lithuania
    "LU": "LUX", // Luxembourg
    "LV": "LVA", // Latvia
    "LY": "LBY", // Libya
    "MA": "MAR", // Morocco
    "MC": "MCO", // Monaco
    "MD": "MDA", // Moldova, Republic of
    "ME": "MNE", // Montenegro
    "MF": "MAF", // Saint Martin (French part)
    "MG": "MDG", // Madagascar
    "MH": "MHL", // Marshall Islands
    "MK": "MKD", // Macedonia, the former Yugoslav Republic of
    "ML": "MLI", // Mali
    "MM": "MMR", // Myanmar
    "MN": "MNG", // Mongolia
    "MO": "MAC", // Macao
    "MP": "MNP", // Northern Mariana Islands
    "MQ": "MTQ", // Martinique
    "MR": "MRT", // Mauritania
    "MS": "MSR", // Montserrat
    "MT": "MLT", // Malta
    "MU": "MUS", // Mauritius
    "MV": "MDV", // Maldives
    "MW": "MWI", // Malawi
    "MX": "MEX", // Mexico
    "MY": "MYS", // Malaysia
    "MZ": "MOZ", // Mozambique
    "NA": "NAM", // Namibia
    "NC": "NCL", // New Caledonia
    "NE": "NER", // Niger
    "NF": "NFK", // Norfolk Island
    "NG": "NGA", // Nigeria
    "NI": "NIC", // Nicaragua
    "NL": "NLD", // Netherlands
    "NO": "NOR", // Norway
    "NP": "NPL", // Nepal
    "NR": "NRU", // Nauru
    "NU": "NIU", // Niue
    "NZ": "NZL", // New Zealand
    "OM": "OMN", // Oman
    "PA": "PAN", // Panama
    "PE": "PER", // Peru
    "PF": "PYF", // French Polynesia
    "PG": "PNG", // Papua New Guinea
    "PH": "PHL", // Philippines
    "PK": "PAK", // Pakistan
    "PL": "POL", // Poland
    "PM": "SPM", // Saint Pierre and Miquelon
    "PN": "PCN", // Pitcairn
    "PR": "PRI", // Puerto Rico
    "PS": "PSE", // Palestine, State of
    "PT": "PRT", // Portugal
    "PW": "PLW", // Palau
    "PY": "PRY", // Paraguay
    "QA": "QAT", // Qatar
    "RE": "REU", // Réunion
    "RO": "ROU", // Romania
    "RS": "SRB", // Serbia
    "RU": "RUS", // Russian Federation
    "RW": "RWA", // Rwanda
    "SA": "SAU", // Saudi Arabia
    "SB": "SLB", // Solomon Islands
    "SC": "SYC", // Seychelles
    "SD": "SDN", // Sudan
    "SE": "SWE", // Sweden
    "SG": "SGP", // Singapore
    "SH": "SHN", // Saint Helena, Ascension and Tristan da Cunha
    "SI": "SVN", // Slovenia
    "SJ": "SJM", // Svalbard and Jan Mayen
    "SK": "SVK", // Slovakia
    "SL": "SLE", // Sierra Leone
    "SM": "SMR", // San Marino
    "SN": "SEN", // Senegal
    "SO": "SOM", // Somalia
    "SR": "SUR", // Suriname
    "SS": "SSD", // South Sudan
    "ST": "STP", // Sao Tome and Principe
    "SV": "SLV", // El Salvador
    "SX": "SXM", // Sint Maarten (Dutch part)
    "SY": "SYR", // Syrian Arab Republic
    "SZ": "SWZ", // Swaziland
    "TC": "TCA", // Turks and Caicos Islands
    "TD": "TCD", // Chad
    "TF": "ATF", // French Southern Territories
    "TG": "TGO", // Togo
    "TH": "THA", // Thailand
    "TJ": "TJK", // Tajikistan
    "TK": "TKL", // Tokelau
    "TL": "TLS", // Timor-Leste
    "TM": "TKM", // Turkmenistan
    "TN": "TUN", // Tunisia
    "TO": "TON", // Tonga
    "TR": "TUR", // Turkey
    "TT": "TTO", // Trinidad and Tobago
    "TV": "TUV", // Tuvalu
    "TW": "TWN", // Taiwan, Province of China
    "TZ": "TZA", // Tanzania, United Republic of
    "UA": "UKR", // Ukraine
    "UG": "UGA", // Uganda
    "UM": "UMI", // United States Minor Outlying Islands
    "US": "USA", // United States
    "UY": "URY", // Uruguay
    "UZ": "UZB", // Uzbekistan
    "VA": "VAT", // Holy See (Vatican City State)
    "VC": "VCT", // Saint Vincent and the Grenadines
    "VE": "VEN", // Venezuela, Bolivarian Republic of
    "VG": "VGB", // Virgin Islands, British
    "VI": "VIR", // Virgin Islands, U.S.
    "VN": "VNM", // Viet Nam
    "VU": "VUT", // Vanuatu
    "WF": "WLF", // Wallis and Futuna
    "WS": "WSM", // Samoa
    "XK": "XKX", // Kosovo
    "YE": "YEM", // Yemen
    "YT": "MYT", // Mayotte
    "ZA": "ZAF", // South Africa
    "ZM": "ZMB", // Zambia
    "ZW": "ZWE"  // Zimbabwe
};

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

var getISO3CountryCode = function(phone) {
  var countryCodeISO2 = getCountryCode(phone);
  if(countryCodeISO2) {
    return ccISO2toISO3[countryCodeISO2];
  }
  return null;
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
  getISO3CountryCode: getISO3CountryCode,
  isValid: isValid,
  getType: getType,
  PhoneUtil: phoneUtil,
  PhoneNumberFormat: PhoneNumberFormat,
  'i18n.phonenumbers': i18n.phonenumbers
};
