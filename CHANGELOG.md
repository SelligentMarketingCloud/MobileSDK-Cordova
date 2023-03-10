# Changelog

## [3.1.0] - 10 March 2023

### Changed
- Add version 4.0.3 of the Android SDK to `src/android/frameworks`
- Change used native SDK version number to `4.0.3` for Android in README
- Change the version number of the google-services classpath doc entry to `x.y.z` to reflect that the user should keep it up to date, and add appropriate comment about this fact

## [3.0.0] - 7 December 2022

### Added
- Add `org.jetbrains.kotlinx:kotlinx-coroutines-android` dependency to support Android SDK v4.0.1

### Changed
- Add version 4.0.1 of the Android SDK to `src/android/frameworks`
- Change used native SDK version number to `4.0.1` for Android in README
- Remove everything to do with `googleApplicationId` from Android, including tests, as this setting was completely removed from Selligent's SDK
- On Android, use an SMNotificationButton's button action's `getValue()` method to get the action value, in accordance with Selligent's new API

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