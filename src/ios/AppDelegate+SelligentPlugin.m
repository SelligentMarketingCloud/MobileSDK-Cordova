#import "AppDelegate+SelligentPlugin.h"
#import <objc/runtime.h>
#import "SelligentPlugin.h"
#import "SMHelper.h"
#import "ClientSettings.h"
#import "SelligentLogger.h"
#import "EnumMapper.h"
#import "SMManagerSetting+ClientSettings.h"

#if defined(__IPHONE_10_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
@import UserNotifications;
@interface AppDelegate () <UNUserNotificationCenterDelegate>
@end
#endif

@implementation AppDelegate (SelligentPlugin)

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        SEL originalSelector = @selector(application:didFinishLaunchingWithOptions:);
        SEL swizzledSelector = @selector(swPluginApplication:didFinishLaunchingWithOptions:);
        [self _swizzleOriginalSelector:originalSelector withSelector:swizzledSelector];
    });
}

- (BOOL)swPluginApplication:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [self _prepareForPushNotifications];
    [self _startSelligentSDKWithLaunchOptions:launchOptions];
    return [self swPluginApplication:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)_startSelligentSDKWithLaunchOptions:(NSDictionary *)launchOptions {
    NSArray *selligentSettingsJSONPathComponents = @[[[NSBundle mainBundle] bundlePath], @"www", @"assets", @"selligent.json"];
    NSString *selligentSettingsJSONPath = [NSString pathWithComponents:selligentSettingsJSONPathComponents];
    if ([[NSFileManager defaultManager] fileExistsAtPath:selligentSettingsJSONPath]) {
        NSData *data = [NSData dataWithContentsOfFile:selligentSettingsJSONPath];
        NSDictionary *settingsJson = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:nil];
        ClientSettings *clientSettings = [ClientSettings fromDictionary:settingsJson];
        SMManagerSetting *settings = [SMManagerSetting smManagerSettingsFrom:clientSettings];
        [[SMManager sharedInstance] startWithLaunchOptions:launchOptions Setting:settings];
    } else {
        [SelligentLogger log:@"no selligent.json file found. Please provide a selligent.json file in your www/assets folder"];
    }
}

- (void)_prepareForPushNotifications {
    #if defined(__IPHONE_10_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;
    #endif
}

- (void)application:(UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    [[SMManager sharedInstance] performIAMFetchWithCompletionHandler:completionHandler];
}

- (void)application:(UIApplication*)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken {
    [[SMManager sharedInstance] didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication*)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
    [[SMManager sharedInstance] didRegisterUserNotificationSettings:notificationSettings];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    [[SMManager sharedInstance] didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    void (^fetchCompletionHandler)(UIBackgroundFetchResult) = ^(UIBackgroundFetchResult backgroundResult) {
        [[SelligentPlugin selligentPlugin] sendRemoteNotificationFetchCompleted:userInfo backgroundFetchResult:backgroundResult];
    };
    
    NSNumber *requestedForcedRemoteNotificationBackgroundFetchResult = [[SelligentPlugin selligentPlugin] requestedForcedRemoteNotificationBackgroundFetchResult];
    if (requestedForcedRemoteNotificationBackgroundFetchResult) {
        [[SMManager sharedInstance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:fetchCompletionHandler ForceResultFetch:requestedForcedRemoteNotificationBackgroundFetchResult.integerValue];
    } else {
        [[SMManager sharedInstance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:fetchCompletionHandler];
    }
    
}

#if defined(__IPHONE_10_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
    [[SMManager sharedInstance] willPresentNotification:notification withCompletionHandler:completionHandler];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)(void))completionHandler {
    [[SMManager sharedInstance] didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}
#endif

+ (void)_swizzleOriginalSelector:(SEL)originalSelector withSelector:(SEL)swizzledSelector {
    Class class = [self class];
    Method original = class_getInstanceMethod(class, originalSelector);
    Method swizzled = class_getInstanceMethod(class, swizzledSelector);
    
    BOOL didAddMethod = class_addMethod(class, originalSelector, method_getImplementation(swizzled), method_getTypeEncoding(swizzled));
    if (didAddMethod) {
        class_replaceMethod(class, swizzledSelector, method_getImplementation(original), method_getTypeEncoding(original));
    } else {
        method_exchangeImplementations(original, swizzled);
    }
}

@end
