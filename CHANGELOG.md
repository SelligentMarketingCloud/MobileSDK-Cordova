# Changelog

## [2.8.0] - 12 September 2022

### Changed
- Add version 3.10.1 of the Android SDK to `src/android/frameworks`
- Add version 2.7.7 of the iOS SDK static library to `src/ios/frameworks`
- Change used native SDK version numbers to `3.10.1` and `2.7.7` for Android and iOS respectively in README

### Fixed
- Fix typos in README

## [2.7.0] - 20 May 2022

### Added
- Add possibility to set the app's notification channel's ID, name, and description on `Android` via `notificationChannelId`, `notificationChannelName`, and `notificationChannelDescription` settings keys in `selligent.json`
- Add comment to README about rich push notification method invocation deprecation on iOS.
### Changed
- Add version 3.9.0 of the Android SDK to `src/android/frameworks`
- Add version 2.7.4 of the iOS SDK static library to `src/ios/frameworks`
- Change used native SDK version numbers to `3.9.0` and `2.7.4` for Android and iOS respectively in README

## [2.6.0] - 24 February 2022

### Added
- Re-add the geolocation functionalities for Android and iOS
- Re-add geolocation documentation to README

### Changed
- Add version 3.8.1 of the Android SDK to `src/android/frameworks`
- Add version 2.7.2 of the iOS SDK static library to `src/ios/frameworks`
- Update the SDK versions to `3.8.1` and `2.7.2` for Android and iOS respectively in README
- Change this project's version number to `2.6.0` in `package.json`, `package-lock.json`, and `plugin.xml`

### Fixed
 - Fix typos in documentation for installing Huawei dependencies and libraries for Android in README 