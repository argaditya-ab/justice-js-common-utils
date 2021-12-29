# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.25.1]
### Fixed
- Remove unintended character in regex generator

## [1.25.0]
### Added
- Added regex generator utils

### Changed
- Allow validateRegex to validate unicode character

## [1.24.1]
### Fixed
- Fixed `validateDomain` regex constructor need to be double escaped
  otherwise it will be parsed as literal character 

## [1.24.0]
### Fixed
- Added new validation: `validateDomain`

## [1.23.1]
### Fixed
- Fixed `validateDatabaseName` not exported

## [1.23.0]
### Added
- Added new validation (`validateDatabaseName`) to validate Database Name

## [1.22.0]
### Added
- Expose build

## [1.21.4]
### Added
- Added service error translation for invalid EQU8 api key

## [1.21.3]
### Changed
- Change validation on `validateChannelName` to support use underscore and uppercase text

## [1.21.2]
### Added
- Added Service Error Translation for Matchmaking Ruleset duplicate channel name

## [1.21.1]
### Added
- Add augments admin service error

## [1.21.0]
### Added
- Added reporting moderation admin service error

## [1.20.1]
### Added
- Added error message for error default language and default region

## [1.20.0]
### Added
- Added Permission guard utils

## [1.19.2]
### Changed
- Update translation for season pass admin error 30341

## [1.19.1]
### Added
- Added error message for error update default value of draft store

## [1.19.0]
### Added
- Added error message for duplicate sku when creating item

## [1.18.2]
### Fixed
- Fix validateJSON for number input

## [1.18.1]
### Fix
- Fix validateJSON not exported

## [1.18.0]
### Added
- Add new validation function (validateJSON) to validate value with JSON format

## [1.17.0]
### Added
- Add new validation function (validateRegex) to validate value using custom regex

## [1.16.0]
### Added
- Add new validation function to validate code if any spaces is considered empty

## [1.13.0]
### Added
- Add new validation function (validateSeasonPassCode) to validate code in season pass service

## [1.12.1]
### Added
- Add new validation function (validateProductKey) to validate product key

## [1.12.0]
### Added
- maxFileSize param for validateFile

# [1.11.4]
## Added
- Adding new validation function (validateDockerImageVersion) for validate Docker Image Version

## [1.11.3]
### Changed
- Update translation for IAM admin error 20017

## [1.11.2]
### Changed
- Update translation for IAM admin error 20017
- Update translation for legal admin error 40043

## [1.11.1]
### Added
-  Translation UGC management error code 771703, 771904, and 772804

## [1.11.0]
### Added
- Translation for IAM admin error 20017

## [1.10.8]
### Changed
- Update regex in validateChannelName

## [1.10.7]
### Changed
- Update regex in validatePath to support underscore and hyphen

## [1.10.6]
### Added
- Translation for Lobby and Matchmaking error 11403

## [1.10.5]
### Added
- Validity criteria for validateUrl

## [1.10.4]
### Added
- New maxLength param for validateSKU

### Changed
- validateSKU max length updated to 32

## [1.10.3]
### Added
- Translation for UGC Management error 771902 and 771403

## [1.10.2]
### Added
- Translation for Rewards error 34071

## [1.10.1]
### Added
- Translation for IAM error 10177

## [1.10.0]
### Added
- Adding new validation function (validateCpuSizeNonNomad) for validate the CPU non-nomad version
- Adding new validation function (validateMemorySizeNonNomad) for validate the Memory non-nomad version

## [1.9.0]
### Added
- Translation for Legal error 40030

## [1.8.3]
### Changed
- Edit CPU and Memory size to number validate

## [1.8.2]
### Changed
- Edit error message for error code 10136

## [1.8.1]
### Changed
- Adding alreadyUsed on errorType.ts

## [1.8.0]
### Added
- Added validateFile

## [1.7.1]
### Changed
- Fix not import new validation function on index.ts

## [1.7.0]
### Changed
- Adding new validation function (validateLegalDocumentName) for validate legal document name

## [1.6.3]
### Changed
- Username validation regex

## [1.6.2]
### Changed
- Change regex on validateUrl to support RFC 3986

## [1.6.1]
### Changed
- Translation for IAM error 10143
- Translation for GDPR error 13122
- Change isCustomProtocol to allowCustomProtocol

## [1.6.0]
### Added
- Added allow custom protocol on validateUrl

## [1.5.0]
### Added
- Added not allow decimal on validateNumeric

## [1.4.1]
### Changed
- Translation for Basic error code 11233, 11337, 11440, 11441, 20000, 20008, and 20019
- Translation for IAM error code 20022, 10152, 10149, and 10148

## [1.4.0]
### Added
- Translations for ecommerce error code 35121, 35122, 35125, 31177, and 38121

## [1.3.2]
### Fix
- Typo in IAM error translation `serviceError.10136`

## [1.3.1]
### Added
- Added GDPR wrong password error translation

## [1.3.0]
### Added
- Added validateBase64

## [1.2.4]
### Changed
- Order numbers validation length to have minimum 17 length

## [1.2.3]
### Fixed
- Username regex pattern

## [1.2.2]
### Fixed
- Match display name validation with the backend validation

## [1.1.0]
### Added
- Support multi language
- Support zh-CN language

## [1.0.1]
### Fixed
- Ecommerce error translation not showed on Admin Portal

## [1.0.0]
### Added
- Added validateKubelessName
- Added validateStatisticCode
- Added ecommerce service error translation
- Added validateComplexPasswordAsObject
- Added Validation class
- Added validateAlphanumeric
- Added validateComplexPassword
- Added validateCpuSize
- Added validateDisplayName
- Added validateDockerImage
- Added validateEmail
- Added validateLength
- Added validateMemorySize
- Added validateNotEmpty
- Added validateNumeric
- Added validateOrderNumber
- Added validatePath
- Added validatePermissionResource
- Added validatePersonName
- Added validateTag
- Added validateSku
- Added validateTemplateSlug
- Added validateTopic
- Added validateUrl
- Added validateUuidV4WithoutHyphen
- Added validateAlpha, with option to check lowercase or uppercase only
- Added validateSecretKey
- Adding isRequired option for some validate function
- Adding isAllValid method, to check whether all value in validation is valid or not
- Exposed commonValidationErrorType
- Added invalidValue in commonValidationErrorType
- Added validation excluded numbers in validateNumeric
- Fixed validatePermissionResource regex to allow `*` as variable
- Fixed validatePermissionResource regex to allow alphanumeric as variable
- Fixed validateDisplayName regex to not allow double white space as separator
- Fixed validatePersonName regex to not allow double white space as separator
- Change some validate functions that has `invalidOption` error, to throw error on `invalidOption` instead of returning it.
- Update regex for UUID
- Added Justice service error translator library
- Added translateServiceErrorForAdmin on Justice service error translator library, add some translations
- Fixed validateSKU regex
- Added validateChannelName
- Changed validateChannelName separator from "_" to "-"
- Added validateBadWords with multiple localization support
- Fix validate display name when text to be validated longer than 27 char with space at the end
- Add allowUnicode param on ValidateDisplayName to support multi language character (eg: Russian, Japanese, Arabic, etc)
- Add strictSpecialCharacters param on ValidateDisplayName to allow or disable DisplayName can contain (',. -) at the mid of the text
- Add support displayName allowUnicode for language with non-spacing mark (eg: Tamil, Thai, etc)
- Added param matchingMode on validateBadWord matching to be match instead of contain
- Added more english bad words dictionary
- Added kubeless handler input validation
- Fixed validateBadWords bug when using uppercase and repeated character
- Export validateChannelName in index file of input-validation
- Added PSN redirect uri support
- Added max length parameter in display name validation
