var cordova = require('cordova');

exports.defineAutoTests = function () {

    // setup
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

    var VERSION_LIB = "versionLib";
    var RELOAD = "reload";
    var SEND_DEVICE_INFO = "sendDeviceInfo";
    var ENABLE_GEOLOCATION = "enableGeolocation";
    var IS_GEOLOCATION_ENABLED = "isGeolocationEnabled";
    var ENABLE_NOTIFICATIONS = "enableNotifications";
    var DISPLAY_LAST_RECEIVED_REMOTE_PUSH_NOTIFICATION = "displayLastReceivedRemotePushNotification";
    var GET_LAST_REMOTE_PUSH_NOTIFICATION = "getLastRemotePushNotification";

    // tests
    describe('Selligent (window.Selligent)', function () {
        it('should exist', function () {
            expect(window.Selligent).toBeDefined();
        });

        it('should contain "ClearCacheIntervalValue" constants that are defined', function () {
            expect(window.Selligent.ClearCacheIntervalValue).toBeDefined();
            expect(window.Selligent.ClearCacheIntervalValue.AUTO).toBe(1);
            expect(window.Selligent.ClearCacheIntervalValue.NONE).toBe(2);
            expect(window.Selligent.ClearCacheIntervalValue.WEEK).toBe(4);
            expect(window.Selligent.ClearCacheIntervalValue.MONTH).toBe(5);
            expect(window.Selligent.ClearCacheIntervalValue.QUARTER).toBe(6);
            expect(window.Selligent.ClearCacheIntervalValue.Android).toBeDefined();
            expect(window.Selligent.ClearCacheIntervalValue.Android.DAY).toBe(3);
        });

        it('should contain "InAppMessageRefreshType" constants that are defined', function () {
            expect(window.Selligent.InAppMessageRefreshType).toBeDefined();
            expect(window.Selligent.InAppMessageRefreshType.NONE).toBe(10);
            expect(window.Selligent.InAppMessageRefreshType.MINUTE).toBe(11);
            expect(window.Selligent.InAppMessageRefreshType.HOUR).toBe(12);
            expect(window.Selligent.InAppMessageRefreshType.DAY).toBe(13);
        });

        it('should contain "AndroidRemoteMessagesDisplayType" constants that are defined', function () {
            expect(window.Selligent.AndroidRemoteMessagesDisplayType).toBeDefined();
            expect(window.Selligent.AndroidRemoteMessagesDisplayType.AUTOMATIC).toBe(20);
            expect(window.Selligent.AndroidRemoteMessagesDisplayType.NONE).toBe(21);
            expect(window.Selligent.AndroidRemoteMessagesDisplayType.NOTIFICATION).toBe(22);
        });

        it('should contain "iOSLogLevel" constants that are defined', function () {
            expect(window.Selligent.iOSLogLevel).toBeDefined();
            expect(window.Selligent.iOSLogLevel.NONE).toBe(50);
            expect(window.Selligent.iOSLogLevel.INFO).toBe(51);
            expect(window.Selligent.iOSLogLevel.WARNING).toBe(52);
            expect(window.Selligent.iOSLogLevel.ERROR).toBe(53);
            expect(window.Selligent.iOSLogLevel.HTTP_CALL).toBe(54);
            expect(window.Selligent.iOSLogLevel.LOCATION).toBe(55);
            expect(window.Selligent.iOSLogLevel.ALL).toBe(56);
        });

        it('should contain "iOSBackgroundFetchResult" constants that are defined', function () {
            expect(window.Selligent.iOSBackgroundFetchResult).toBeDefined();
            expect(window.Selligent.iOSBackgroundFetchResult.NEW_DATA).toBe(60);
            expect(window.Selligent.iOSBackgroundFetchResult.NO_DATA).toBe(61);
            expect(window.Selligent.iOSBackgroundFetchResult.FAILED).toBe(62);
        });

        it('should contain "iOSLocationAuthorisationStatus" constants that are defined', function () {
            expect(window.Selligent.iOSLocationAuthorisationStatus).toBeDefined();
            expect(window.Selligent.iOSLocationAuthorisationStatus.UNKNOWN).toBe(70);
            expect(window.Selligent.iOSLocationAuthorisationStatus.REFUSED).toBe(71);
            expect(window.Selligent.iOSLocationAuthorisationStatus.GRANTED_IN_USE).toBe(72);
            expect(window.Selligent.iOSLocationAuthorisationStatus.GRANTED_ALWAYS).toBe(73);
        });

        it('should contain "iOSLocationAuthorisationType" constants that are defined', function () {
            expect(window.Selligent.iOSLocationAuthorisationType).toBeDefined();
            expect(window.Selligent.iOSLocationAuthorisationType.IN_USE).toBe(80);
            expect(window.Selligent.iOSLocationAuthorisationType.ALWAYS).toBe(81);
        });

        it('should contain "EventType" constants that are defined', function () {
            expect(window.Selligent.EventType).toBeDefined();
            expect(window.Selligent.EventType.USER_REGISTER).toBe(90);
            expect(window.Selligent.EventType.USER_UNREGISTER).toBe(91);
            expect(window.Selligent.EventType.USER_LOGIN).toBe(92);
            expect(window.Selligent.EventType.USER_LOGOUT).toBe(93);
            expect(window.Selligent.EventType.CUSTOM).toBe(94);
        });


        it('should contain a "getVersionLib" function', function () {
            expect(typeof window.Selligent.getVersionLib).toBeDefined();
            expect(typeof window.Selligent.getVersionLib === 'function').toBeTruthy();
        });

        it('should contain a "reloadSettings" function', function () {
            expect(typeof window.Selligent.reloadSettings).toBeDefined();
            expect(typeof window.Selligent.reloadSettings === 'function').toBeTruthy();
        });

        it('should contain a "sendDeviceInfo" function', function () {
            expect(typeof window.Selligent.sendDeviceInfo).toBeDefined();
            expect(typeof window.Selligent.sendDeviceInfo === 'function').toBeTruthy();
        });

        it('should contain a "loadSettings" function', function () {
            expect(typeof window.Selligent.loadSettings).toBeDefined();
            expect(typeof window.Selligent.loadSettings === 'function').toBeTruthy();
        });

        it('should contain a "enableGeolocation" function', function () {
            expect(typeof window.Selligent.enableGeolocation).toBeDefined();
            expect(typeof window.Selligent.enableGeolocation === 'function').toBeTruthy();
        });

        it('should contain a "isGeolocationEnabled" function', function () {
            expect(typeof window.Selligent.isGeolocationEnabled).toBeDefined();
            expect(typeof window.Selligent.isGeolocationEnabled === 'function').toBeTruthy();
        });

        it('should contain a "enableNotifications" function', function () {
            expect(typeof window.Selligent.enableNotifications).toBeDefined();
            expect(typeof window.Selligent.enableNotifications === 'function').toBeTruthy();
        });

        it('should contain a "displayLastReceivedRemotePushNotification" function', function () {
            expect(typeof window.Selligent.displayLastReceivedRemotePushNotification).toBeDefined();
            expect(typeof window.Selligent.displayLastReceivedRemotePushNotification === 'function').toBeTruthy();
        });

        it('should contain a "getLastRemotePushNotification" function', function () {
            expect(typeof window.Selligent.getLastRemotePushNotification).toBeDefined();
            expect(typeof window.Selligent.getLastRemotePushNotification === 'function').toBeTruthy();
        });
    });

    describe('getVersionLib', function () {
        it('should return a string and the correct version on success', function (done) {
            var success = function (response) {
                expect(typeof response).toBeDefined();
                expect(typeof response === 'string').toBeTruthy();

                if (cordova.platformId === "android") {
                    expect(response).toBe("1.7.0");
                } else if (cordova.platformId === "ios") {
                    expect(response).toBe("2.0.1");
                }

                done();
            };

            Selligent.getVersionLib(success, failTest);
        });
    });

    describe('reloadSettings', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should call cordova.exec with correct arguments if passed arguments are valid', function () {
            var testSettings = {
                url: "url",
                clientId: "client id",
                privateKey: "private key",
                googleApplicationId: "google application id",
                clearCacheIntervalValue: window.Selligent.ClearCacheIntervalValue.AUTO,
                configureLocationServices: true,
                inAppMessageRefreshType: window.Selligent.InAppMessageRefreshType.HOUR,
                shouldClearBadge: true,
                shouldDisplayRemoteNotification: true,
                shouldPerformBackgroundFetch: true,
                fullyQualifiedNotificationActivityClassName: "com.myCompany.myApplication",
                remoteMessageDisplayType: window.Selligent.AndroidRemoteMessagesDisplayType.AUTOMATIC
            };
            Selligent.reloadSettings(
                success,
                error,
                testSettings
            );

            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, RELOAD, [testSettings]);
        });
        it('should return an error on insufficient settings object', function () {
            var success = failTest;
            var testSettings = {};

            Selligent.reloadSettings(
                success,
                error,
                testSettings
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should throw an error on insufficient arguments', function () {
            expect(function () {
                Selligent.reloadSettings(
                    success,
                    error
                );
            }).toThrow();
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "googleApplicationId"', function () {
            var success = failTest;

            var testSettings = {
                url: "url",
                clientId: "clientId",
                privateKey: "privateKey",
                googleApplicationId: true // expecting a string here, so this will trigger an error
            };

            Selligent.reloadSettings(
                success,
                error,
                testSettings
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "clearCacheIntervalValue"', function () {
            var success = failTest;

            var testSettings = {
                url: "url",
                clientId: "clientId",
                privateKey: "privateKey",
                clearCacheIntervalValue: "test" // expecting a number here
            };
            Selligent.reloadSettings(
                success,
                error,
                testSettings
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "configureLocationServices"', function () {
            var success = failTest;

            var testSettings = {
                url: "url",
                clientId: "clientId",
                privateKey: "privateKey",
                configureLocationServices: "test" // expecting a boolean here
            };

            Selligent.reloadSettings(
                success,
                error,
                testSettings
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "inAppMessageRefreshType"', function () {
            var success = failTest;

            var testSettings = {
                url: "url",
                clientId: "clientId",
                privateKey: "privateKey",
                inAppMessageRefreshType: "test" // expecting a number here
            };

            Selligent.reloadSettings(
                success,
                error,
                testSettings
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "shouldClearBadge"', function () {
            var success = failTest;

            var testSettings = {
                url: "url",
                clientId: "clientId",
                privateKey: "privateKey",
                shouldClearBadge: "test" // expecting a boolean here
            };

            Selligent.reloadSettings(
                success,
                error,
                testSettings
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "shouldDisplayRemoteNotification"', function () {
            var success = failTest;

            var testSettings = {
                url: "url",
                clientId: "clientId",
                privateKey: "privateKey",
                shouldDisplayRemoteNotification: "test" // expecting a boolean here
            };

            Selligent.reloadSettings(
                success,
                error,
                testSettings
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "shouldPerformBackgroundFetch"', function () {
            var success = failTest;

            var testSettings = {
                url: "url",
                clientId: "clientId",
                privateKey: "privateKey",
                shouldPerformBackgroundFetch: "test" // expecting a boolean here
            };

            Selligent.reloadSettings(
                success,
                error,
                testSettings
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('sendDeviceInfo', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            var options = {
                externalId: "random external id"
            };

            Selligent.sendDeviceInfo(
                success,
                error,
                options
            );
            // expect(cordova.exec).toHaveBeenCalledWith([success, error, SELLIGENT_PLUGIN, SEND_DEVICE_INFO, [options.externalId]]);

            // can't test equality between options.externalId because the parameter is being extracted and reconstructed in the underlying method, giving false failures in this test.
            expect(cordova.exec).toHaveBeenCalled();
            expect(cordova.exec.calls.mostRecent().args[0]).toEqual(success);
            expect(cordova.exec.calls.mostRecent().args[1]).toEqual(error);
            expect(cordova.exec.calls.mostRecent().args[2]).toEqual(SELLIGENT_PLUGIN);
            expect(cordova.exec.calls.mostRecent().args[3]).toEqual(SEND_DEVICE_INFO);

            expect(cordova.exec.calls.mostRecent().args[4]).toEqual([options.externalId]);
        });
        it('should return an error on insufficient arguments', function () {
            var success = failTest;

            var options = {};

            Selligent.sendDeviceInfo(
                success,
                error,
                options
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should throw an error on insufficient arguments', function () {

            expect(function () {
                Selligent.sendDeviceInfo(
                    success,
                    error
                );
            }).toThrow();
            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof "externalId"', function () {
            var success = failTest;

            var options = {
                externalId: true // expecting a string here
            };

            Selligent.sendDeviceInfo(
                success,
                error,
                options
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('loadSettings', function () {
        beforeEach(function () {
            // spyOn(XMLHttpRequest.prototype, 'open').andCallThrough(); // Jasmine 1.x
            spyOn(XMLHttpRequest.prototype, 'open').and.callThrough(); // Jasmine 2.x
            spyOn(XMLHttpRequest.prototype, 'send');
        });

        it('should make an XMLHttpRequest to open the settings file', function () {
            var success = function (response) {
                expect(typeof response).toBeDefined();
            };
            Selligent.loadSettings(success, failTest);
            expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
            expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
        });
    });

    describe('enableGeolocation', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.enableGeolocation(
                success,
                error,
                true
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, ENABLE_GEOLOCATION, [true]);
        });
        it('should return an error on insufficient arguments', function () {
            var success = failTest;

            Selligent.enableGeolocation(
                success,
                error
            );

            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof passed argument', function () {
            var success = failTest;

            Selligent.enableGeolocation(
                success,
                error,
                "faulty string" // expecting a boolean here
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('isGeolocationEnabled', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.isGeolocationEnabled(
                success,
                error
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, IS_GEOLOCATION_ENABLED);
        });
    });

    describe('enableNotifications', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.enableNotifications(
                success,
                error,
                true
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, ENABLE_NOTIFICATIONS, [true]);
        });
        it('should return an error on insufficient arguments', function () {
            var success = failTest;

            Selligent.enableNotifications(
                success,
                error
            );

            expect(cordova.exec).not.toHaveBeenCalled();
        });
        it('should return an error on incorrect typeof passed argument', function () {
            var success = failTest;

            Selligent.enableNotifications(
                success,
                error,
                "faulty string" // expecting a boolean here
            );
            expect(cordova.exec).not.toHaveBeenCalled();
        });
    });

    describe('displayLastReceivedRemotePushNotification', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.displayLastReceivedRemotePushNotification(
                success,
                error
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, DISPLAY_LAST_RECEIVED_REMOTE_PUSH_NOTIFICATION);
        });
    });

    describe('getLastRemotePushNotification', function () {
        beforeEach(function () {
            spyOn(cordova, 'exec').and.callFake(function (successCallback, errorCallback, pluginName, methodName, args) {
                successCallback("successful");
            });
        });
        afterEach(function () {
            cordova.exec.calls.reset();
        });

        it('should be successful with valid passed arguments', function () {
            Selligent.getLastRemotePushNotification(
                success,
                error
            );
            expect(cordova.exec).toHaveBeenCalledWith(success, error, SELLIGENT_PLUGIN, GET_LAST_REMOTE_PUSH_NOTIFICATION);
        });
    });
};