var argscheck = require('cordova/argscheck');
var cordova = require('cordova');
var SelligentConstants = require('./SelligentConstants');
var SelligentHelpers = require('./SelligentHelpers');

var SELLIGENT_PLUGIN = "SelligentPlugin";

var VERSION_LIB = "versionLib";
var RELOAD = "reload";
var SEND_DEVICE_INFO = "sendDeviceInfo";
var ENABLE_GEOLOCATION = "enableGeolocation";
var IS_GEOLOCATION_ENABLED = "isGeolocationEnabled";
var ENABLE_NOTIFICATIONS = "enableNotifications";
var DISPLAY_LAST_RECEIVED_REMOTE_PUSH_NOTIFICATION = "displayLastReceivedRemotePushNotification";
var GET_LAST_REMOTE_PUSH_NOTIFICATION = "getLastRemotePushNotification";

/**
 * @exports Selligent
 */
var Selligent = {};

// Map the Selligent Constants to the base Selligent plugin.
for (var key in SelligentConstants) {
    Selligent[key] = SelligentConstants[key];
}

/**
 * Returns the version of the underlying Selligent SDK.
 * 
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @returns {string} Returns the version of the underlying Selligent SDK.
 */
Selligent.getVersionLib = function (successCallback, errorCallback) {
    // check that callbacks are functions
    // for more information see https://github.com/apache/cordova-js/blob/master/src/common/argscheck.js
    argscheck.checkArgs('FF', 'Selligent.getVersionLib', arguments);

    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        VERSION_LIB
    );
};

/**
 * Reload settings of the Selligent manager.
 * 
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {object} settings Settings to reload the Selligent manager with.
 */
Selligent.reloadSettings = function (successCallback, errorCallback, settings) {
    // check that args is an object and callbacks are functions
    argscheck.checkArgs('FFO', 'Selligent.reloadSettings', arguments);

    // check if required options are valid
    if (!SelligentHelpers.hasRequiredParameterAndMatchesType(settings, "url", "string") ||
        !SelligentHelpers.hasRequiredParameterAndMatchesType(settings, "clientId", "string") ||
        !SelligentHelpers.hasRequiredParameterAndMatchesType(settings, "privateKey", "string")) {
        errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected an object with keys \"url\", \"clientId\" and \"privateKey\", and strings for values." + " " + SelligentHelpers.MORE_INFORMATION);
        return;
    }
    // check if optional options are valid
    if (!SelligentHelpers.hasOptionalParameterAndMatchesType(settings, "googleApplicationId", "string")) {
        errorCallback(SelligentHelpers.createTypeErrorMessage("googleApplicationId", settings.googleApplicationId, "string"));
        return;
    }
    if (!SelligentHelpers.hasOptionalParameterAndMatchesType(settings, "clearCacheIntervalValue", "number", Selligent.ClearCacheIntervalValue)) {
        errorCallback(SelligentHelpers.createTypeErrorMessage("clearCacheIntervalValue", settings.clearCacheIntervalValue, "number"));
        return;
    }
    if (!SelligentHelpers.hasOptionalParameterAndMatchesType(settings, "configureLocationServices", "boolean")) {
        errorCallback(SelligentHelpers.createTypeErrorMessage("configureLocationServices", settings.configureLocationServices, "boolean"));
        return;
    }
    if (!SelligentHelpers.hasOptionalParameterAndMatchesType(settings, "inAppMessageRefreshType", "number", Selligent.InAppMessageRefreshType)) {
        errorCallback(SelligentHelpers.createTypeErrorMessage("inAppMessageRefreshType", settings.inAppMessageRefreshType, "number"));
        return;
    }
    // iOS only
    if (!SelligentHelpers.hasOptionalParameterAndMatchesType(settings, "shouldClearBadge", "boolean")) {
        errorCallback(SelligentHelpers.createTypeErrorMessage("shouldClearBadge", settings.shouldClearBadge, "boolean"));
        return;
    }
    if (!SelligentHelpers.hasOptionalParameterAndMatchesType(settings, "shouldDisplayRemoteNotification", "boolean")) {
        errorCallback(SelligentHelpers.createTypeErrorMessage("shouldDisplayRemoteNotification", settings.shouldDisplayRemoteNotification, "boolean"));
        return;
    }
    if (!SelligentHelpers.hasOptionalParameterAndMatchesType(settings, "shouldPerformBackgroundFetch", "boolean")) {
        errorCallback(SelligentHelpers.createTypeErrorMessage("shouldPerformBackgroundFetch", settings.shouldPerformBackgroundFetch, "boolean"));
        return;
    }

    // Android only 
    if (!SelligentHelpers.hasRequiredParameterAndMatchesType(settings, "fullyQualifiedNotificationActivityClassName", "string")) {
        errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected an object with key \"fullyQualifiedNotificationActivityClassName\" of the type \"string\"." + " " + SelligentHelpers.MORE_INFORMATION);
        return;
    }
    if (!SelligentHelpers.hasOptionalParameterAndMatchesType(settings, "remoteMessageDisplayType", "number", Selligent.AndroidRemoteMessagesDisplayType)) {
        errorCallback(SelligentHelpers.createTypeErrorMessage("remoteMessageDisplayType", settings.remoteMessageDisplayType, "number"));
        return;
    }

    // continue if options are valid
    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        RELOAD,
        [settings]
    );
};

/**
 * Send device information to selligent.
 * 
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {object} options Object with externalId.
 */
Selligent.sendDeviceInfo = function (successCallback, errorCallback, options) {
    // check that options is an object and callbacks are functions
    argscheck.checkArgs('FFO', 'Selligent.sendDeviceInfo', arguments);

    // check if required options are valid
    if (!SelligentHelpers.hasRequiredParameterAndMatchesType(options, "externalId", "string")) {
        errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected an object with key \"externalId\" of the type \"string\"." + " " + SelligentHelpers.MORE_INFORMATION);
        return;
    }

    // continue if options are valid
    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        SEND_DEVICE_INFO,
        [options.externalId]
    );
};
/**
 * Load settings from "/assets/selligent.json"
 * 
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @returns {object} Returns an object containing the settings of the selligent.json file. 
 */
Selligent.loadSettings = function (successCallback, errorCallback) {
    // check that callbacks are functions
    argscheck.checkArgs('FF', 'Selligent.loadSettings', arguments);
    try {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'assets/selligent.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4) {
                successCallback(JSON.parse(xobj.responseText));
            }
        };
        xobj.send(null);
    } catch (error) {
        errorCallback(error);
    }
};

/**
 * Enable/disable geolocation.
 *  
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {boolean} enabled Boolean to enable or disable geolocation.
 */
Selligent.enableGeolocation = function (successCallback, errorCallback, enabled) {
    // check that callbacks are functions (can't check args as a boolean)
    argscheck.checkArgs('FF*', 'Selligent.enableGeolocation', arguments);

    if (!SelligentHelpers.typeMatches(enabled, "boolean")) {
        errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a boolean." + " " + SelligentHelpers.MORE_INFORMATION);
        return;
    }
    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        ENABLE_GEOLOCATION,
        [enabled]
    );
};

/**
 * Check if geolocation is enabled or disabled.
 *  
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @returns {boolean} Returns a boolean stating geolocation is enabled or disabled.
 */
Selligent.isGeolocationEnabled = function (successCallback, errorCallback) {
    // check that callbacks are functions
    argscheck.checkArgs('FF', 'Selligent.isGeolocationEnabled', arguments);

    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        IS_GEOLOCATION_ENABLED
    );
};

/**
 * Enable/disable notification.
 *  
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {boolean} enabled Boolean to enable or disable notifications.
 */
Selligent.enableNotifications = function (successCallback, errorCallback, enabled) {
    // check that callbacks are functions (can't check args as a boolean)
    argscheck.checkArgs('FF*', 'Selligent.enableNotifications', arguments);

    if (!SelligentHelpers.typeMatches(enabled, "boolean")) {
        errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a boolean." + " " + SelligentHelpers.MORE_INFORMATION);
        return;
    }
    cordova.exec(successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        ENABLE_NOTIFICATIONS,
        [enabled]
    );
};
/**
 * Display the last received remote push notification
 *  
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 */
Selligent.displayLastReceivedRemotePushNotification = function (successCallback, errorCallback) {
    // check that callbacks are functions
    argscheck.checkArgs('FF', 'Selligent.displayLastReceivedRemotePushNotification', arguments);

    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        DISPLAY_LAST_RECEIVED_REMOTE_PUSH_NOTIFICATION
    );
};

/**
 * Get last remote push notification
 *  
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @returns {object} Returns the last remote push notification.
 */
Selligent.getLastRemotePushNotification = function (successCallback, errorCallback) {
    // check that callbacks are functions
    argscheck.checkArgs('FF', 'Selligent.getLastRemotePushNotification', arguments);

    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        GET_LAST_REMOTE_PUSH_NOTIFICATION
    );
};
module.exports = Selligent;