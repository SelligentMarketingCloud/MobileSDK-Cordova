#import <Cordova/CDVPlugin.h>

@interface SelligentPlugin : CDVPlugin

+ (SelligentPlugin *)selligentPlugin;

- (void)reload:(CDVInvokedUrlCommand*)command;
- (void)versionLib:(CDVInvokedUrlCommand*)command;
- (void)applyLogLevel:(CDVInvokedUrlCommand*)command;
- (void)enableInAppMessages:(CDVInvokedUrlCommand*)command;
- (void)requestLocationAuthorisation:(CDVInvokedUrlCommand*)command;
- (void)isGeolocationEnabled:(CDVInvokedUrlCommand*)command;
- (void)enableGeolocation:(CDVInvokedUrlCommand*)command;
- (void)sendDeviceInfo:(CDVInvokedUrlCommand*)command;
- (void)sendEvent:(CDVInvokedUrlCommand*)command;
- (void)registerRemoteNotificationFetchCompletionHandler:(CDVInvokedUrlCommand *)command;
- (void)forceRemoteNotificationBackgroundFetchResult:(CDVInvokedUrlCommand *)command;
- (void)getDeviceId:(CDVInvokedUrlCommand*)command;
- (void)enableNotifications:(CDVInvokedUrlCommand *)command;
- (void)registerForProvisionalRemoteNotification:(CDVInvokedUrlCommand *)command;
- (void)displayLastReceivedRemotePushNotification:(CDVInvokedUrlCommand *)command;
- (void)getLastRemotePushNotification:(CDVInvokedUrlCommand *)command;
- (void)displayNotification:(CDVInvokedUrlCommand *)command;
- (void)subscribeToEvents:(CDVInvokedUrlCommand *)command;
- (void)getInAppMessages:(CDVInvokedUrlCommand *)command;
- (void)setInAppMessageAsSeen:(CDVInvokedUrlCommand *)command;
- (void)executeButtonAction:(CDVInvokedUrlCommand *)command;

- (void)sendRemoteNotificationFetchCompleted:(NSDictionary *)notification backgroundFetchResult:(UIBackgroundFetchResult)backgroundResult;

@property (nonatomic) NSNumber *requestedForcedRemoteNotificationBackgroundFetchResult;

@end
