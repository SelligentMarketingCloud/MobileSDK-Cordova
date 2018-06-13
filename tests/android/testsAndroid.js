var cordova = require('cordova');

// ANDROID SPECIFIC TESTS
exports.defineAutoTests = function () {
    var failTest = function (response) {
        expect(true).toBeFalsy(); // trigger a failing test
    };
    var success = function (response) {
        expect(typeof response).toBeDefined();
        expect(response).toBe("successful");
    };
    var error = function (response) {
        expect(typeof response).toBeDefined();
    };

    // constants, they need to be copy pasted from the original files
    var SELLIGENT_PLUGIN = "SelligentPlugin";

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
    var GET_REMOTE_MESSAGES_DISPLAY_TYPE = "getRemoteMessagesDisplayType";

    describe('Selligent (window.Selligent) Android specific tests', function () {
        it('should contain a "enableAndroidLogging" function', function () {
            expect(typeof window.Selligent.enableAndroidLogging).toBeDefined();
            expect(typeof window.Selligent.enableAndroidLogging === 'function').toBe(true);
        });

        it('should contain a "setApplication" function', function () {
            expect(typeof window.Selligent.setApplication).toBeDefined();
            expect(typeof window.Selligent.setApplication === 'function').toBe(true);
        });

        it('should contain a "enableInAppMessages" function', function () {
            expect(typeof window.Selligent.enableInAppMessages).toBeDefined();
            expect(typeof window.Selligent.enableInAppMessages === 'function').toBe(true);
        });

        it('should contain a "areInAppMessagesEnabled" function', function () {
            expect(typeof window.Selligent.areInAppMessagesEnabled).toBeDefined();
            expect(typeof window.Selligent.areInAppMessagesEnabled === 'function').toBe(true);
        });

        it('should contain a "displayMessage" function', function () {
            expect(typeof window.Selligent.displayMessage).toBeDefined();
            expect(typeof window.Selligent.displayMessage === 'function').toBe(true);
        });

        it('should contain a "sendEvent" function', function () {
            expect(typeof window.Selligent.sendEvent).toBeDefined();
            expect(typeof window.Selligent.sendEvent === 'function').toBe(true);
        });

        it('should contain a "subscribeToEvents" function', function () {
            expect(typeof window.Selligent.subscribeToEvents).toBeDefined();
            expect(typeof window.Selligent.subscribeToEvents === 'function').toBe(true);
        });

        it('should contain a "areNotificationsEnabled" function', function () {
            expect(typeof window.Selligent.areNotificationsEnabled).toBeDefined();
            expect(typeof window.Selligent.areNotificationsEnabled === 'function').toBe(true);
        });

        it('should contain a "setNotificationSmallIcon" function', function () {
            expect(typeof window.Selligent.setNotificationSmallIcon).toBeDefined();
            expect(typeof window.Selligent.setNotificationSmallIcon === 'function').toBe(true);
        });

        it('should contain a "setNotificationLargeIcon" function', function () {
            expect(typeof window.Selligent.setNotificationLargeIcon).toBeDefined();
            expect(typeof window.Selligent.setNotificationLargeIcon === 'function').toBe(true);
        });

        it('should contain a "getGCMToken" function', function () {
            expect(typeof window.Selligent.getGCMToken).toBeDefined();
            expect(typeof window.Selligent.getGCMToken === 'function').toBe(true);
        });

        it('should contain a "getRemoteMessagesDisplayType" function', function () {
            expect(typeof window.Selligent.getRemoteMessagesDisplayType).toBeDefined();
            expect(typeof window.Selligent.getRemoteMessagesDisplayType === 'function').toBe(true);
        });
    });

    describe('setApplication', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should call cordova.exec with correct arguments if passed arguments are valid', function () {
            Selligent.setApplication(
                success,
                error
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, SET_APPLICATION);
        });
    });

    describe('enableAndroidLogging', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });


        it('should be successful with valid passed arguments', function () {
            Selligent.enableAndroidLogging(
                success,
                error,
                true
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, SET_DEBUG, [true]);
        });
        it('should return an error on incorrect typeof passed argument', function () {
            var success = fail;

            Selligent.enableAndroidLogging(
                success,
                error,
                "faulty argument" // expecting a boolean here 
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on insufficient arguments', function () {
            Selligent.enableAndroidLogging(
                success,
                error
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('enableInAppMessages', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments (enum)', function () {
            Selligent.enableInAppMessages(
                success,
                error,
                Selligent.InAppMessageRefreshType.HOUR
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, ENABLE_IN_APP_MESSAGES, [true, Selligent.InAppMessageRefreshType.HOUR]);
        });
        it('should be successful with valid passed arguments (boolean value "false")', function () {
            Selligent.enableInAppMessages(
                success,
                error,
                false
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, ENABLE_IN_APP_MESSAGES, [false]);
        });
        it('should return an error on invalid passed arguments (boolean value "true")', function () {
            Selligent.enableInAppMessages(
                success,
                error,
                true
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof passed argument', function () {
            Selligent.enableInAppMessages(
                success,
                error,
                "faulty argument" // expecting a boolean or number here 
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on insufficient arguments', function () {
            Selligent.enableInAppMessages(
                success,
                error
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('areInAppMessagesEnabled', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should call cordova.exec on valid passed arguments', function () {
            Selligent.areInAppMessagesEnabled(
                success,
                error
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, ARE_IN_APP_MESSAGES_ENABLED);
        });
    });

    describe('displayMessage', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.displayMessage(
                success,
                error,
                "messageId"
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, DISPLAY_MESSAGE, ["messageId"]);
        });
        it('should throw an error on incorrect typeof passed argument', function () {
            expect(function () {
                Selligent.displayMessage(
                    success,
                    error,
                    true // expecting a string here 
                );
            }).toThrow();
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on insufficient arguments', function () {
            Selligent.displayMessage(
                success,
                error
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('sendEvent', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            var event = {
                type: window.Selligent.EventType.CUSTOM,
                data: {}
            };

            Selligent.sendEvent(
                success,
                error,
                event
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, SEND_EVENT, [event]);
        });
        it('should throw an error on incorrect typeof passed argument', function () {
            var success = fail;

            expect(function () {
                Selligent.sendEvent(
                    success,
                    error,
                    "faulty string" // expecting an object here 
                );
            }).toThrow();
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "type" argument', function () {
            var success = fail;

            Selligent.sendEvent(
                success,
                error,
                {
                    type: "faulty string", // expecting a number here
                    data: {}
                }
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "data" argument', function () {
            var success = fail;

            Selligent.sendEvent(
                success,
                error,
                {
                    type: window.Selligent.EventType.CUSTOM,
                    data: "faulty string" // expecting an object here
                }
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "email" argument', function () {
            var success = fail;

            Selligent.sendEvent(
                success,
                error,
                {
                    type: window.Selligent.EventType.USER_REGISTER,
                    data: {},
                    email: true // expecting a string here
                }
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on missing "data" argument with a "custom" event type', function () {
            var success = fail;

            Selligent.sendEvent(
                success,
                error,
                {
                    type: window.Selligent.EventType.USER_REGISTER
                }
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on missing "email" argument with a "non-custom" event type', function () {
            var success = fail;

            Selligent.sendEvent(
                success,
                error,
                {
                    type: window.Selligent.EventType.USER_REGISTER,
                    data: {}
                }
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should throw an error on insufficient arguments', function () {
            expect(function () {
                Selligent.sendEvent(
                    success,
                    error
                );
            }).toThrow();
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('subscribeToEvents', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.subscribeToEvents(
                success,
                error
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, SUBSCRIBE_TO_EVENTS);
        });
        it('should be successful with valid passed arguments (optional custom events inclusive)', function () {
            var testCustomEvents = ["some", "random", "event"];

            Selligent.subscribeToEvents(
                success,
                error,
                testCustomEvents
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, SUBSCRIBE_TO_EVENTS, testCustomEvents);
        });
        it('should return an error on incorrect typeof passed argument', function () {
            Selligent.subscribeToEvents(
                success,
                error,
                true // expecting an array here 
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('areNotificationsEnabled', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should call cordova.exec on valid passed arguments', function () {
            Selligent.areNotificationsEnabled(
                success,
                error
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, ARE_NOTIFICATIONS_ENABLED);
        });
    });

    describe('setNotificationSmallIcon', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.setNotificationSmallIcon(
                success,
                error,
                "icon"
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, SET_NOTIFICATION_SMALL_ICON, ["icon"]);
        });
        it('should throw an error on incorrect typeof passed argument', function () {
            expect(function () {
                Selligent.setNotificationSmallIcon(
                    success,
                    error,
                    true // expecting a string here 
                );
            }).toThrow();
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on insufficient arguments', function () {
            Selligent.setNotificationSmallIcon(
                success,
                error
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('setNotificationLargeIcon', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.setNotificationLargeIcon(
                success,
                error,
                "icon"
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, SET_NOTIFICATION_LARGE_ICON, ["icon"]);
        });
        it('should throw an error on incorrect typeof passed argument', function () {
            expect(function () {
                Selligent.setNotificationLargeIcon(
                    success,
                    error,
                    true // expecting a string here 
                );
            }).toThrow();
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on insufficient arguments', function () {
            Selligent.setNotificationLargeIcon(
                success,
                error
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('getGCMToken', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should call cordova.exec on valid passed arguments', function () {
            Selligent.getGCMToken(
                success,
                error
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, GET_GCM_TOKEN);
        });
    });

    describe('getRemoteMessagesDisplayType', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should call cordova.exec on valid passed arguments', function () {
            Selligent.getRemoteMessagesDisplayType(
                success,
                error
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, GET_REMOTE_MESSAGES_DISPLAY_TYPE);
        });
    });
};
