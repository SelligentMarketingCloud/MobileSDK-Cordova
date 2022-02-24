#import <Cordova/CDVPlugin.h>
#import "SelligentPlugin.h"
#import "ClientSettings.h"
#import "SMManagerSetting.h"
#import "SMManagerSettingIAM.h"
#import "SMManager.h"
#import "SMManager+Log.h"
#import "SMManager+Location.h"
#import "SMManager+InAppMessage.h"
#import "SMManager+DataTransaction.h"
#import "SMManager+RemoteNotification.h"
#import "SMManagerSetting+ClientSettings.h"
#import "EnumMapper.h"
#import "SMManager+SMEvent.h"
#import "LogLevel.h"
#import "Event.h"
#import "Event+SMEvent.h"
#import "SMHelper.h"

static SelligentPlugin *selligentPlugin;

static NSString * const BROADCAST_BUTTON_CLICKED = @"ButtonClicked";
static NSString * const BROADCAST_RECEIVED_IN_APP_MSG = @"ReceivedInAppMessage";
static NSString * const BROADCAST_WILL_DISPLAY_NOTIFICATION = @"WillDisplayNotification";
static NSString * const BROADCAST_WILL_DISMISS_NOTIFICATION = @"WillDismissNotification";
static NSString * const BROADCAST_RECEIVED_DEVICE_ID = @"ReceivedDeviceId";
static NSString * const BROADCAST_RECEIVEDREMOTENOTIFICATION = @"ReceivedRemoteNotification";

@implementation SelligentPlugin {
    NSString *_remoteNotificationFetchCompletionHandlerCallbackId;
    NSString *_broadcastEventCallbackId;
}

+ (SelligentPlugin *) selligentPlugin {
    return selligentPlugin;
}

- (void)pluginInitialize {
    selligentPlugin = self;
}

- (void)_setupEventObservation {
    [self _addOrReplaceObserverForSelector:@selector(_handleDidReceiveInAppMessage:) forName:kSMNotification_Event_DidReceiveInAppMessage];
    [self _addOrReplaceObserverForSelector:@selector(_handleButtonClicked:) forName:kSMNotification_Event_ButtonClicked];
    [self _addOrReplaceObserverForSelector:@selector(_handleWillDisplayNotification:) forName:kSMNotification_Event_WillDisplayNotification];
    [self _addOrReplaceObserverForSelector:@selector(_handleWillDismissNotification:) forName:kSMNotification_Event_WillDismissNotification];
    [self _addOrReplaceObserverForSelector:@selector(_handleReceivedDeviceId:) forName:kSMNotification_Data_DeviceId];
    [self _addOrReplaceObserverForSelector:@selector(_handleDidReceiveRemoteNotification:) forName:kSMNotification_Event_DidReceiveRemoteNotification];
}

- (void)_addOrReplaceObserverForSelector:(SEL)selector forName:(NSString *)name {
    [[NSNotificationCenter defaultCenter] removeObserver:self name:name object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:selector name:name object:nil];
}

- (void)reload:(CDVInvokedUrlCommand*)command {
    ClientSettings *clientSettings = [ClientSettings fromDictionary:command.arguments[0]];
    SMManagerSetting *settings = [SMManagerSetting smManagerSettingsFrom:clientSettings];
    [[SMManager sharedInstance] reloadSetting:settings];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void)versionLib:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[SMManager sharedInstance].versionLib];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)applyLogLevel:(CDVInvokedUrlCommand*)command {
    __block NSInteger requestedBitShiftedLogLevel = 0;
    for (NSNumber *logLevel in command.arguments) {
        LogLevel plLogLevel = logLevel.integerValue;
        SMLogLevel smLogLevel = [[EnumMapper sharedEnumMapper] smLogLevelForLogLevel:plLogLevel];
        requestedBitShiftedLogLevel = requestedBitShiftedLogLevel | smLogLevel;
    }
    [[SMManager sharedInstance] applyLogLevel:(SMLogLevel) requestedBitShiftedLogLevel];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void)enableInAppMessages:(CDVInvokedUrlCommand *)command {
    NSNumber *enabled = command.arguments[0];
    [[SMManager sharedInstance] enableInAppMessage:enabled.boolValue];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void)getInAppMessages:(CDVInvokedUrlCommand *)command {
    NSArray *inAppMessages = [[SMManager sharedInstance] getInAppMessages];
    NSMutableArray *mappedMessages = [NSMutableArray new];
    for (SMInAppMessage *inAppMessage in inAppMessages) {
        NSMutableArray *mappedLinks = [NSMutableArray new];
        for (SMLink *link in [inAppMessage arrayIAMLinks]) {
            [mappedLinks addObject: @{
                @"id" : [link idButtonData],
                @"label" : [link label],
                @"value" : [link value],
                @"type" : @([link type]),
            }];
        }
        [mappedMessages addObject: @{
            @"id" : [inAppMessage idMessage],
            @"title" : [inAppMessage title],
            @"body" : [inAppMessage body],
            @"receptionDate" : [inAppMessage receptionDate] ? @([[inAppMessage receptionDate] timeIntervalSince1970]) : [NSNull null],
            @"creationDate" : @([[inAppMessage creationDate] timeIntervalSince1970]),
            @"expirationDate" : [inAppMessage expirationDate] ? @([[inAppMessage expirationDate] timeIntervalSince1970]) : [NSNull null],
            @"hasBeenSeen" : @([inAppMessage isViewed]),
            @"type" : @([inAppMessage iamType]),
            @"buttons" : mappedLinks
        }];
    }
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:mappedMessages] callbackId:command.callbackId];
}

- (void)setInAppMessageAsSeen:(CDVInvokedUrlCommand *)command {
    NSString *messageId = command.arguments[0];
    NSArray *inAppMessages = [[SMManager sharedInstance] getInAppMessages];
    for (SMInAppMessage *inAppMessage in inAppMessages) {
        if ([[inAppMessage idMessage] isEqualToString: messageId]) {
            [[SMManager sharedInstance] setInAppMessageAsSeen: inAppMessage];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
            return;
        }
    }
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString: [NSString stringWithFormat:@"No message with id %@ found", messageId]] callbackId:command.callbackId];

}

- (void)executeButtonAction:(CDVInvokedUrlCommand *)command {
    NSString *buttonId = command.arguments[0];
    NSString *messageId = command.arguments[1];
    NSArray *inAppMessages = [[SMManager sharedInstance] getInAppMessages];
    for (SMInAppMessage *inAppMessage in inAppMessages) {
        if ([[inAppMessage idMessage] isEqualToString: messageId]) {
            for (SMLink *link in [inAppMessage arrayIAMLinks]) {
                if ([[link idButtonData] isEqualToString: buttonId]) {
                    [[SMManager sharedInstance] executeLinkAction: link InAppMessage:inAppMessage];
                    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
                    return;
                }
            }
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString: @("buttonId does not exist in message.")] callbackId:command.callbackId];
            return;
        }
    }
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString: [NSString stringWithFormat:@"No message with id %@ found", messageId]] callbackId:command.callbackId];
}

- (void)isGeolocationEnabled:(CDVInvokedUrlCommand *)command {
    BOOL enabled = [[SMManager sharedInstance] isGeoLocationEnabled];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:enabled] callbackId:command.callbackId];
}

- (void)enableGeolocation:(CDVInvokedUrlCommand *)command {
    NSNumber *arg = command.arguments[0];
    BOOL enable = [arg boolValue];
    if (enable) {
        [[SMManager sharedInstance] enableGeoLocation];
    } else {
        [[SMManager sharedInstance] disableGeoLocation];
    }
    // execute isGeolocationEnabled routine to check and return current enabled status
    [self isGeolocationEnabled:command];
}

- (void)sendDeviceInfo:(CDVInvokedUrlCommand *)command {
    NSString *externalId = command.arguments[0];
    SMDeviceInfos *deviceInfos = [SMDeviceInfos deviceInfosWithExternalId:externalId];
    [[SMManager sharedInstance] sendDeviceInfo:deviceInfos];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void)sendEvent:(CDVInvokedUrlCommand *)command {
    NSDictionary *data = command.arguments[0];
    Event *event = [Event fromDictionary:data];
    SMEvent *smEvent = [event smEventWithBlockSuccess:^(SMSuccess *success) {
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:success.messageSM] callbackId:command.callbackId];
    } BlockFailure:^(SMFailure *failure) {
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:failure.messageSM] callbackId:command.callbackId];
    }];
    [[SMManager sharedInstance] sendSMEvent:smEvent];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void)forceRemoteNotificationBackgroundFetchResult:(CDVInvokedUrlCommand *)command {
    NSNumber *remoteNotificationBackgroundFetchResultAsNumber = command.arguments[0];
    self.requestedForcedRemoteNotificationBackgroundFetchResult = @([[EnumMapper sharedEnumMapper] uiBackgroundFetchResultForBackgroundFetchResult:remoteNotificationBackgroundFetchResultAsNumber.integerValue]);
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void)registerRemoteNotificationFetchCompletionHandler:(CDVInvokedUrlCommand *)command {
    _remoteNotificationFetchCompletionHandlerCallbackId = command.callbackId;
}

- (void)sendRemoteNotificationFetchCompleted:(NSDictionary *)notification backgroundFetchResult:(UIBackgroundFetchResult)backgroundResult {
    if (_remoteNotificationFetchCompletionHandlerCallbackId != nil) {
        NSDictionary *message = @{
                                  @"backgroundFetchResult": @([[EnumMapper sharedEnumMapper] backgroundFetchResultForUIBackgroundFetchResult:backgroundResult]),
                                  @"notification" : notification,
                                  };
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:message];
        [pluginResult setKeepCallbackAsBool:YES];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:_remoteNotificationFetchCompletionHandlerCallbackId];
    }
}

- (void)getDeviceId:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[SMManager sharedInstance].deviceID];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)enableNotifications:(CDVInvokedUrlCommand *)command {
    NSNumber *enabled = command.arguments[0];
    if(enabled.boolValue) {
        [[SMManager sharedInstance] registerForRemoteNotification];
    } else {
        [[SMManager sharedInstance] unregisterForRemoteNotification];
    }
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}


- (void)registerForProvisionalRemoteNotification:(CDVInvokedUrlCommand *)command {
    if (@available(iOS 12.0, *)) {
        [[SMManager sharedInstance] registerForProvisionalRemoteNotification];
    }
}

- (void)displayLastReceivedRemotePushNotification:(CDVInvokedUrlCommand *)command {
    [[SMManager sharedInstance] displayLastReceivedRemotePushNotification];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void)getLastRemotePushNotification:(CDVInvokedUrlCommand *)command {
    NSDictionary *lastRemotePushNotification = [[SMManager sharedInstance] retrieveLastRemotePushNotification];
    NSDictionary *message = nil;
    if(lastRemotePushNotification) {
        message = @{
          @"id" : lastRemotePushNotification[@"id"],
          @"title" : lastRemotePushNotification[@"title"],
        };
    }
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:message];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)displayNotification:(CDVInvokedUrlCommand *)command {
    NSString *messageId = command.arguments[0];
    [[SMManager sharedInstance] displayNotificationID:messageId];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void)subscribeToEvents:(CDVInvokedUrlCommand *)command {
    _broadcastEventCallbackId = command.callbackId;
    [self _setupEventObservation];
}

#pragma mark - Event Observation

- (void)_handleButtonClicked:(NSNotification*)notification {
    NSDictionary *dict = [notification userInfo];
    SMNotificationButtonData *btnData = dict[kSMNotification_Data_ButtonData];
    NSDictionary *data = @{
            @"type": @([[EnumMapper sharedEnumMapper] notificationButtonTypeForSMNotificationButtonType:btnData.type]),
            @"value": btnData.value ?: [NSNull null],
            @"id": btnData.idButtonData ?: [NSNull null],
            @"label": btnData.label ?: [NSNull null],
    };
    [self _sendBroadcastEventResultWithData:data andType:BROADCAST_BUTTON_CLICKED];
}

- (void)_handleDidReceiveInAppMessage:(NSNotification*)notification {
    NSDictionary *dict = [notification userInfo];
    NSArray *inAppMessageData = dict[kSMNotification_Data_InAppMessage];
    NSDictionary *data = @{
            @"messages": inAppMessageData ?: [NSNull null],
    };
    [self _sendBroadcastEventResultWithData:data andType:BROADCAST_RECEIVED_IN_APP_MSG];
}

- (void)_handleDidReceiveRemoteNotification:(NSNotification*)notification {
    NSDictionary *dict = [notification userInfo];
    NSDictionary *notificationData = dict[kSMNotification_Data_RemoteNotification];
    NSDictionary *data = @{
            @"pushId": notificationData[@"pushId"] ?: [NSNull null],
            @"name": notificationData[@"name"] ?: [NSNull null],
    };
    [self _sendBroadcastEventResultWithData:data andType:BROADCAST_RECEIVEDREMOTENOTIFICATION];
}

- (void)_handleWillDisplayNotification:(NSNotification*)notification {
    [self _sendBroadcastEventResultWithData:nil andType:BROADCAST_WILL_DISPLAY_NOTIFICATION];
}

- (void)_handleWillDismissNotification:(NSNotification*)notification {
    [self _sendBroadcastEventResultWithData:nil andType:BROADCAST_WILL_DISMISS_NOTIFICATION];
}

- (void)_handleReceivedDeviceId:(NSNotification*)notification {
    NSDictionary *dict = [notification userInfo];
    NSString *deviceId = [dict objectForKey:kSMNotification_Data_DeviceId];
    NSDictionary *data = @{
        @"deviceId": deviceId
    };
    [self _sendBroadcastEventResultWithData:data andType:BROADCAST_RECEIVED_DEVICE_ID];
}

- (void)_sendBroadcastEventResultWithData:(NSDictionary *)data andType:(NSString *)type {
    NSDictionary *broadcastData = @{
            @"broadcastEventType": type,
            @"data": data ?: [NSNull null],
    };
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:broadcastData];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_broadcastEventCallbackId];
}

#pragma mark - Dealloc

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end



