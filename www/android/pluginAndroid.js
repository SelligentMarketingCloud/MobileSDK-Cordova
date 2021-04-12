var argscheck = require('cordova/argscheck');
var cordova = require('cordova');
var SelligentConstants = require('./SelligentConstants');
var SelligentHelpers = require('./SelligentHelpers');

var SELLIGENT_PLUGIN = "SelligentPlugin";

// METHOD VARS
var SET_APPLICATION = "setApplication";
var SET_DEBUG = "setDebug";
var ENABLE_IN_APP_MESSAGES = "enableInAppMessages";
var ARE_IN_APP_MESSAGES_ENABLED = "areInAppMessagesEnabled";
var DISPLAY_MESSAGE = "displayMessage";
var SEND_EVENT = "sendEvent";
var SUBSCRIBE_TO_EVENTS = "subscribeToEvents";
var ARE_NOTIFICATIONS_ENABLED = "areNotificationsEnabled";
var SET_NOTIFICATION_SMALL_ICON = "setNotificationSmallIcon";
var SET_NOTIFICATION_LARGE_ICON = "setNotificationLargeIcon";
var GET_GCM_TOKEN = "getGCMToken";
var SET_FIREBASE_TOKEN = "setFirebaseToken";
var GET_REMOTE_MESSAGES_DISPLAY_TYPE = "getRemoteMessagesDisplayType";


/**
 * @exports Selligent
 */
var Selligent = {};


/**
 * Set application to the Selligent manager.
 *
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 */
Selligent.setApplication = function (successCallback, errorCallback) {
	// check that callbacks are functions
	// for more information see https://github.com/apache/cordova-js/blob/master/src/common/argscheck.js
	argscheck.checkArgs('FF', 'Selligent.setApplication', arguments);

	cordova.exec(
		successCallback,
		errorCallback,
		SELLIGENT_PLUGIN,
		SET_APPLICATION
	);
};

/**
 * Enable logging messages on Android.
 *
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {boolean} shouldEnableLoggingMessages Boolean to enable/disable logging messages on Android.
 * @returns
 */
Selligent.enableAndroidLogging = function (successCallback, errorCallback, shouldEnableLoggingMessages) {
	// check that callbacks are functions (argscheck doesn't support checking for booleans)
	// for more information see https://github.com/apache/cordova-js/blob/master/src/common/argscheck.js
	argscheck.checkArgs('FF*', 'Selligent.enableAndroidLogging', arguments);

	// check if required options are valid
	if (!SelligentHelpers.typeMatches(shouldEnableLoggingMessages, "boolean")) {
		errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a boolean." + " " + SelligentHelpers.MORE_INFORMATION);
		return;
	}

	// continue if options are valid
	cordova.exec(
		successCallback,
		errorCallback,
		SELLIGENT_PLUGIN,
		SET_DEBUG,
		[shouldEnableLoggingMessages]
	);
};

/**
 * Enable/disable in-app messages on Android.
 *
 * Android specific: if args is a boolean set to "true", the in-app messages will be enabled with a default refresh type "DAY".
 *
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {(boolean|InAppMessageRefreshType)} options Boolean to enable/disable in-app messages or an enum InAppMessageRefreshType to enable and set which in-app messages should be enabled.
 * @returns
 */
Selligent.enableInAppMessages = function (successCallback, errorCallback, options) {
	// check that callbacks are functions (can't check options as it can be a boolean or number)
	argscheck.checkArgs('FF*', 'Selligent.enableInAppMessages', arguments);

	if (!(SelligentHelpers.typeMatches(options, "boolean") || SelligentHelpers.constantIsValid(SelligentConstants.InAppMessageRefreshType, options))) {
		errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a boolean with a value of \"false\" to disable, or value of Selligent constant enum \"InAppMessageRefreshType\" to enable." + " " + SelligentHelpers.MORE_INFORMATION);
		return;
	}
	if (SelligentHelpers.typeMatches(options, "boolean") && options === true) {
		errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a boolean with a value of \"false\" to disable, or value of Selligent constant enum \"InAppMessageRefreshType\" to enable." + " " + SelligentHelpers.MORE_INFORMATION);
		return;
	}

	if (SelligentHelpers.typeMatches(options, "boolean") && options === false) {
		cordova.exec(successCallback,
			errorCallback,
			SELLIGENT_PLUGIN,
			ENABLE_IN_APP_MESSAGES,
			[options]
		);
	} else if (SelligentHelpers.typeMatches(options, "number")) {
		cordova.exec(successCallback,
			errorCallback,
			SELLIGENT_PLUGIN,
			ENABLE_IN_APP_MESSAGES,
			[true, options]
		);
	} else {
		errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a boolean with a value of \"false\" to disable, or value of Selligent constant enum \"InAppMessageRefreshType\" to enable." + " " + SelligentHelpers.MORE_INFORMATION);
	}
};

/**
 * To check if in app messages are enabled on Android.
 *
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @returns {boolean} Returns a boolean indicating whether in-app messages are enabled or disabled on Android.
 */
Selligent.areInAppMessagesEnabled = function (successCallback, errorCallback) {
	// check that callbacks are functions
	argscheck.checkArgs('FF', 'Selligent.areInAppMessagesEnabled', arguments);

	cordova.exec(
		successCallback,
		errorCallback,
		SELLIGENT_PLUGIN,
		ARE_IN_APP_MESSAGES_ENABLED
	);
};

/**
 * Display message on Android.
 *
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {string} messageId Id of the message.
 */
Selligent.displayMessage = function (successCallback, errorCallback, messageId) {
	// check that callbacks are functions
	argscheck.checkArgs('FFS', 'Selligent.displayMessage', arguments);

	// check that "messageId" is a string that is not empty
	if (!SelligentHelpers.typeMatches(messageId, "string") || messageId.length === 0) {
		errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a string (not empty)." + " " + SelligentHelpers.MORE_INFORMATION);
		return;
	}

	cordova.exec(
		successCallback,
		errorCallback,
		SELLIGENT_PLUGIN,
		DISPLAY_MESSAGE,
		[messageId]
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
 * @param {array} customEvents Array of custom events to subscribe to.
 * @returns {object} Returns an object containing the broadcast event data if available.
 */
Selligent.subscribeToEvents = function (successCallback, errorCallback, customEvents) {
	// check that callbacks are functions
	argscheck.checkArgs('FF*', 'Selligent.subscribeToEvents', arguments);

	// ANDROID ONLY: check if optional custom events array is valid
	if (customEvents !== undefined) {
		if (!SelligentHelpers.typeMatches(customEvents, "array")) {
			errorCallback(SelligentHelpers.createTypeErrorMessage("customEvents", customEvents, "array"));
			return;
		}

		// check if values are all strings
		var arrayLength = customEvents.length;
		for (var i = 0; i < arrayLength; i++) {
			if (!SelligentHelpers.typeMatches(customEvents[i], "string")) {
				errorCallback("Expected an array of strings in \"customEvents\"." + " " + SelligentHelpers.MORE_INFORMATION);
				return;
			}
		}

		cordova.exec(
			successCallback,
			errorCallback,
			SELLIGENT_PLUGIN,
			SUBSCRIBE_TO_EVENTS,
			customEvents
		);
	} else {
		cordova.exec(
			successCallback,
			errorCallback,
			SELLIGENT_PLUGIN,
			SUBSCRIBE_TO_EVENTS
		);
	}
};

/**
 * Check if notifications are enabled or disabled.
 *
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @returns {boolean} Returns a boolean stating notifications are enabled or disabled.
 */
Selligent.areNotificationsEnabled = function (successCallback, errorCallback) {
	// check that callbacks are functions
	argscheck.checkArgs('FF', 'Selligent.areNotificationsEnabled', arguments);

	cordova.exec(
		successCallback,
		errorCallback,
		SELLIGENT_PLUGIN,
		ARE_NOTIFICATIONS_ENABLED
	);
};

/**
 * Set the resource for the small icon for notifications on Android.
 *
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {string} iconName Name of the icon.
 */
Selligent.setNotificationSmallIcon = function (successCallback, errorCallback, iconName) {
	// check that callbacks are functions
	argscheck.checkArgs('FFS', 'Selligent.setNotificationSmallIcon', arguments);

	// check that "iconName" is a string that is not empty
	if (!SelligentHelpers.typeMatches(iconName, "string") || iconName.length === 0) {
		errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a string (not empty)." + " " + SelligentHelpers.MORE_INFORMATION);
		return;
	}

	cordova.exec(
		successCallback,
		errorCallback,
		SELLIGENT_PLUGIN,
		SET_NOTIFICATION_SMALL_ICON,
		[iconName]
	);
};

/**
 * Set the resource for the large icon for notifications on Android.
 *
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {string} iconName Name of the icon.
 */
Selligent.setNotificationLargeIcon = function (successCallback, errorCallback, iconName) {
	// check that callbacks are functions
	argscheck.checkArgs('FFS', 'Selligent.setNotificationLargeIcon', arguments);

	// check that "iconName" is a string that is not empty
	if (!SelligentHelpers.typeMatches(iconName, "string") || iconName.length === 0) {
		errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a string (not empty)." + " " + SelligentHelpers.MORE_INFORMATION);
		return;
	}

	cordova.exec(
		successCallback,
		errorCallback,
		SELLIGENT_PLUGIN,
		SET_NOTIFICATION_LARGE_ICON,
		[iconName]
	);
};


/**
 * Get GCM Token
 *
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @returns {string} Returns the GCM token on Android.
 */
Selligent.getGCMToken = function (successCallback, errorCallback) {
	// check that callbacks are functions
	argscheck.checkArgs('FF', 'Selligent.getGCMToken', arguments);

	cordova.exec(
		successCallback,
		errorCallback,
		SELLIGENT_PLUGIN,
		GET_GCM_TOKEN
	);
};

/**
 * Set the firebase (GCM) token
 *
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @param {string} token the firebase token.
 */
Selligent.setFirebaseToken = function (successCallback, errorCallback, token) {
	// check that callbacks are functions
	argscheck.checkArgs('FFS', 'Selligent.setFirebaseToken', arguments);

	// check that "token" is a string that is not empty
	if (!SelligentHelpers.typeMatches(token, "string") || token.length === 0) {
		errorCallback(SelligentHelpers.WRONG_ARGUMENTS + " " + "Expected a string (not empty)." + " " + SelligentHelpers.MORE_INFORMATION);
		return;
	}

	cordova.exec(
		successCallback,
		errorCallback,
		SELLIGENT_PLUGIN,
		SET_FIREBASE_TOKEN,
		[token]
	);
};

/**
 * Get remote messages display type.
 *
 * @param {function} successCallback Callback function on success.
 * @param {function} errorCallback Callback function on error.
 * @returns {string} Returns the display type of remote messages on Android.
 */
Selligent.getRemoteMessagesDisplayType = function (successCallback, errorCallback) {
	// check that callbacks are functions
	argscheck.checkArgs('FF', 'Selligent.getRemoteMessagesDisplayType', arguments);

	cordova.exec(
		successCallback,
		errorCallback,
		SELLIGENT_PLUGIN,
		GET_REMOTE_MESSAGES_DISPLAY_TYPE
	);
};
module.exports = Selligent;