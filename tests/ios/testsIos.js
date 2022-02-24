var cordova = require('cordova');

// IOS SPECIFIC TESTS
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

    var APPLY_LOG_LEVEL = "applyLogLevel";
    var ENABLE_IN_APP_MESSAGES = "enableInAppMessages";
    var SEND_EVENT = "sendEvent";
    var SUBSCRIBE_TO_EVENTS = "subscribeToEvents";
    var DISPLAY_NOTIFICATION = "displayNotification";
    var REGISTER_REMOTE_NOTIFICATION_FETCH_COMPLETION_HANDLER = "registerRemoteNotificationFetchCompletionHandler";
    var FORCE_REMOTE_NOTIFICATION_BACKGROUND_FETCH_RESULT = "forceRemoteNotificationBackgroundFetchResult";

    describe('Selligent (window.Selligent) iOS specific tests', function () {
        it('should contain a "enableiOSLogging" function', function () {
            expect(typeof window.Selligent.enableiOSLogging).toBeDefined();
            expect(typeof window.Selligent.enableiOSLogging === 'function').toBe(true);
        });

        it('should contain a "enableInAppMessages" function', function () {
            expect(typeof window.Selligent.enableInAppMessages).toBeDefined();
            expect(typeof window.Selligent.enableInAppMessages === 'function').toBe(true);
        });

        it('should contain a "requestLocationAuthorisation" function', function () {
            expect(typeof window.Selligent.requestLocationAuthorisation).toBeDefined();
            expect(typeof window.Selligent.requestLocationAuthorisation === 'function').toBe(true);
        });

        it('should contain a "sendEvent" function', function () {
            expect(typeof window.Selligent.sendEvent).toBeDefined();
            expect(typeof window.Selligent.sendEvent === 'function').toBe(true);
        });

        it('should contain a "subscribeToEvents" function', function () {
            expect(typeof window.Selligent.subscribeToEvents).toBeDefined();
            expect(typeof window.Selligent.subscribeToEvents === 'function').toBe(true);
        });

        it('should contain a "displayNotification" function', function () {
            expect(typeof window.Selligent.displayNotification).toBeDefined();
            expect(typeof window.Selligent.displayNotification === 'function').toBe(true);
        });
    });

    describe('enableiOSLogging', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            var testLevels = [window.Selligent.iOSLogLevel.INFO, window.Selligent.iOSLogLevel.WARNING];

            Selligent.enableiOSLogging(
                success,
                error,
                testLevels
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, APPLY_LOG_LEVEL, testLevels);
        });
        it('should throw an error on incorrect typeof passed argument', function () {
            expect(function () {
                Selligent.enableiOSLogging(
                    success,
                    error,
                    true // expecting an array here 
                );
            }).toThrow();
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should throw an error on insufficient arguments', function () {
            expect(function () {
                Selligent.enableiOSLogging(
                    success,
                    error
                );
            }).toThrow();
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

        it('should be successful with valid passed arguments', function () {
            Selligent.enableInAppMessages(
                success,
                error,
                true
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, ENABLE_IN_APP_MESSAGES, [true]);
        });
        it('should return an error on incorrect typeof passed argument', function () {
            var success = fail;

            Selligent.enableInAppMessages(
                success,
                error,
                "faulty argument" // expecting a boolean here 
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
                data: {},
                shouldCache: true
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
                    data: {},
                    shouldCache: true
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
                    data: "faulty string", // expecting an object here
                    shouldCache: true
                }
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "shouldCache" argument', function () {
            var success = fail;

            Selligent.sendEvent(
                success,
                error,
                {
                    type: window.Selligent.EventType.CUSTOM,
                    data: {},
                    shouldCache: "faulty string" // expecting a boolean here
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
                    type: window.Selligent.EventType.USER_REGISTER,
                    shouldCache: true
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
                    data: {},
                    shouldCache: true
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
    });

    describe('displayNotification', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.displayNotification(
                success,
                error,
                "notification id"
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, DISPLAY_NOTIFICATION, ["notification id"]);
        });
        it('should throw an error on incorrect typeof passed argument', function () {
            expect(function () {
                Selligent.displayNotification(
                    success,
                    error,
                    true // expecting a string here 
                );
            }).toThrow();
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on insufficient arguments', function () {
            Selligent.displayNotification(
                success,
                error
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('registerRemoteNotificationFetchCompletionHandler', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.registerRemoteNotificationFetchCompletionHandler(
                success,
                error
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, REGISTER_REMOTE_NOTIFICATION_FETCH_COMPLETION_HANDLER);
        });
    });

    describe('forceRemoteNotificationBackgroundFetchResult', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.forceRemoteNotificationBackgroundFetchResult(
                success,
                error,
                Selligent.iOSBackgroundFetchResult.NEW_DATA
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, FORCE_REMOTE_NOTIFICATION_BACKGROUND_FETCH_RESULT, [Selligent.iOSBackgroundFetchResult.NEW_DATA]);
        });
        it('should throw an error on incorrect typeof passed argument', function () {
            expect(function () {
                Selligent.forceRemoteNotificationBackgroundFetchResult(
                    success,
                    error,
                    "faulty argument" // expecting a number here 
                );
            }).toThrow();
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on insufficient arguments', function () {
            Selligent.forceRemoteNotificationBackgroundFetchResult(
                success,
                error
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });
};
