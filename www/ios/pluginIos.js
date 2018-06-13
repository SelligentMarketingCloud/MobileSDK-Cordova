var argscheck = require('cordova/argscheck');
var cordova = require('cordova');
var SelligentConstants = require('./SelligentConstants');
var SelligentHelpers = require('./SelligentHelpers');

var SELLIGENT_PLUGIN = "SelligentPlugin";

// METHOD VARS
var APPLY_LOG_LEVEL = "applyLogLevel";
var ENABLE_IN_APP_MESSAGES = "enableInAppMessages";
var CURRENT_AUTH_STATUS = "currentAuthorisationStatus";
var REQUEST_LOCATION_AUTH = "requestLocationAuthorisation";
var SEND_EVENT = "sendEvent";
var SUBSCRIBE_TO_EVENTS = "subscribeToEvents";
var DISPLAY_NOTIFICATION = "displayNotification";
var REGISTER_REMOTE_NOTIFICATION_FETCH_COMPLETION_HANDLER = "registerRemoteNotificationFetchCompletionHandler";
var FORCE_REMOTE_NOTIFICATION_BACKGROUND_FETCH_RESULT = "forceRemoteNotificationBackgroundFetchResult";

/**
 * @exports Selligent
 */
var Selligent = {};

/**
 * Enable logging messages on iOS.
 * 
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {array} logLevels Array of logging levels that should be enabled.
 */
Selligent.enableiOSLogging = function (successCallback, errorCallback, logLevels) {
    // check that args is an array and callbacks are functions
    // for more information see https://github.com/apache/cordova-js/blob/master/src/common/argscheck.js
    argscheck.checkArgs('FFA', 'Selligent.enableiOSLogging', arguments);
    // extract values from array

    // check if values are all numbers
    var arrayLength = logLevels.length;
    for (var i = 0; i < arrayLength; i++) {
        if (isNaN(logLevels[i]) || !SelligentHelpers.constantIsValid(SelligentConstants.iOSLogLevel, logLevels[i])) {
            errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected an array of value(s) of Selligent constant enum \"iOSLogLevel\"." + " " + SelligentHelpers.MORE_INFORMATION);
            return;
        }
    }

    // continue if arguments are valid
    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        APPLY_LOG_LEVEL,
        logLevels
    );
};

/**
 * Enable/disable in-app messages on iOS.
 *  
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {boolean} enabled Boolean to enable/disable in-app messages.
 */
Selligent.enableInAppMessages = function (successCallback, errorCallback, enabled) {
    // check that callbacks are functions (can't check args as a boolean)
    argscheck.checkArgs('FF*', 'Selligent.enableInAppMessages', arguments);

    if (!SelligentHelpers.typeMatches(enabled, "boolean")) {
        errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a boolean." + " " + SelligentHelpers.MORE_INFORMATION);
        return;
    }

    // continue if arguments are valid
    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        ENABLE_IN_APP_MESSAGES,
        [enabled]
    );
};

/**
 * Get Current AuthorisationStatus.
 *  
 * @param {function} successCallback Callback passing iOSLocationAuthorisationStatus.
 * @param {function} errorCallback Callback function on error.
 * @returns Returns the current authorisation status.
 */
Selligent.currentAuthorisationStatus = function (successCallback, errorCallback) {
    // check that callbacks are functions
    argscheck.checkArgs('FF', 'Selligent.currentAuthorisationStatus', arguments);

    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        CURRENT_AUTH_STATUS
    );
};

/**
 * Request Location Authorisation.
 *  
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {iOSLocationAuthorisationType} iOSLocationAuthorisationType Requested authorisation type.
 * @returns Returns the requested location authorisation.
 */
Selligent.requestLocationAuthorisation = function (successCallback, errorCallback, iOSLocationAuthorisationType) {
    // check that iOSLocationAuthorisationType is a number and callbacks are functions
    argscheck.checkArgs('FFN', 'Selligent.requestLocationAuthorisation', arguments);

    if (!SelligentHelpers.typeMatches(iOSLocationAuthorisationType, "number") || !SelligentHelpers.constantIsValid(SelligentConstants.iOSLocationAuthorisationType, iOSLocationAuthorisationType)) {
        errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a value of Selligent constant enum \"iOSLocationAuthorisationType\"." + " " + SelligentHelpers.MORE_INFORMATION);
        return;
    }

    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        REQUEST_LOCATION_AUTH,
        [iOSLocationAuthorisationType]
    );
};

/**
 * Send event.
 * 
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {object} event Event to send.
 */
Selligent.sendEvent = function (successCallback, errorCallback, event) {
    // check that event is an object and callbacks are functions
    argscheck.checkArgs('FFO', 'Selligent.sendEvent', arguments);

    // check if required event object is valid
    if (!SelligentHelpers.hasRequiredParameterAndMatchesType(event, "type", "number", Selligent.EventType)) {
        errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected an object with a key \"type\", using the Selligent.EventType constants as a value." + " " + SelligentHelpers.MORE_INFORMATION);
        return;
    }

    // check if required / optional event object properties are valid under custom event type
    if (event.type === SelligentConstants.EventType.CUSTOM) {
        if (event.hasOwnProperty("email")) {
            console.warn("Email prop is not used with \"custom\" event type and will be ignored.");
        }
        if (!SelligentHelpers.hasRequiredParameterAndMatchesType(event, "data", "object")) {
            errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected an event object with key \"data\" of the type \"object\"." + " " + SelligentHelpers.MORE_INFORMATION);
            return;
        }
    }
    // check if required / optional event object properties are valid under event types other than custom
    if (event.type !== SelligentConstants.EventType.CUSTOM) {
        if (!SelligentHelpers.hasOptionalParameterAndMatchesType(event, "data", "object")) {
            errorCallback(SelligentHelpers.createTypeErrorMessage("data", event.data, "object"));
            return;
        }
        if (!SelligentHelpers.hasRequiredParameterAndMatchesType(event, "email", "string")) {
            errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected an event object with key \"email\" of the type \"string\"." + " " + SelligentHelpers.MORE_INFORMATION);
            return;
        }
    }

    // IOS ONLY, check if optional "shouldCache" property of the event object is a valid boolean
    if (!SelligentHelpers.hasOptionalParameterAndMatchesType(event, "shouldCache", "boolean")) {
        errorCallback(SelligentHelpers.createTypeErrorMessage("shouldCache", event.shouldCache, "boolean"));
        return;
    }

    // continue if event object is valid
    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        SEND_EVENT,
        [event]
    );
};

/**
 * Subscribe to events.
 * 
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @returns {object} Returns an object containing the broadcast event data if available.
 */
Selligent.subscribeToEvents = function (successCallback, errorCallback) {
    // check that callbacks are functions
    argscheck.checkArgs('FF', 'Selligent.subscribeToEvents', arguments);

    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        SUBSCRIBE_TO_EVENTS
    );
};

/**
 * Display notification by id on iOS.
 * 
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {string} notificationId Id of the notification.
 */
Selligent.displayNotification = function (successCallback, errorCallback, notificationId) {
    // check that callbacks are functions
    argscheck.checkArgs('FFS', 'Selligent.displayNotification', arguments);

    // check that "notificationId" is a string that is not empty
    if (!SelligentHelpers.typeMatches(notificationId, "string") || notificationId.length === 0) {
        errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a string (not empty)." + " " + SelligentHelpers.MORE_INFORMATION);
        return;
    }

    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        DISPLAY_NOTIFICATION,
        [notificationId]
    );
};

/**
 * Register a completion handler for successfully fetching remote notifications.
 * 
 * @param {function} successCallback Completion handler.
 * @param {function} errorCallback Callback function on error.
 */
Selligent.registerRemoteNotificationFetchCompletionHandler = function (successCallback, errorCallback) {
    // check that callbacks are functions
    argscheck.checkArgs('FF', 'Selligent.registerRemoteNotificationFetchCompletionHandler', arguments);

    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        REGISTER_REMOTE_NOTIFICATION_FETCH_COMPLETION_HANDLER
    );
};

/**
 * Force the result of a remote notification fetch to be a specific value.
 * 
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {iOSBackgroundFetchResult} iOSBackgroundFetchResult Type of result to force, when fetching remote notifications.
 */
Selligent.forceRemoteNotificationBackgroundFetchResult = function (successCallback, errorCallback, iOSBackgroundFetchResult) {
    // check that callbacks are functions
    argscheck.checkArgs('FFN', 'Selligent.forceRemoteNotificationBackgroundFetchResult', arguments);

    // check that "iOSBackgroundFetchResult" is a number
    if (!SelligentHelpers.typeMatches(iOSBackgroundFetchResult, "number") || !SelligentHelpers.constantIsValid(SelligentConstants.iOSBackgroundFetchResult, iOSBackgroundFetchResult)) {
        errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a value of Selligent constant enum \"iOSBackgroundFetchResult\"." + " " + SelligentHelpers.MORE_INFORMATION);
        return;
    }

    cordova.exec(
        successCallback,
        errorCallback,
        SELLIGENT_PLUGIN,
        FORCE_REMOTE_NOTIFICATION_BACKGROUND_FETCH_RESULT,
        [iOSBackgroundFetchResult]
    );
};

module.exports = Selligent;