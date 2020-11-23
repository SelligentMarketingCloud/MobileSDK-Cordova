//
//  SMEventUnregistration.h
//  MobileSDK
//
//  Created by Gilbert Schakal on 03/06/15.
//  Copyright (c) 2015 Selligent. All rights reserved.
//

#import "SMEventUser.h"

/*!
 * @class SMEventUserUnregistration
 * @inherits SMEventUser
 * @discussion user unregistration event class
 * #SMEventUserUnregistration:#
 */
@interface SMEventUserUnregistration : SMEventUser

/*!
 *  Create a UserUnregistration event object that will be sent to selligent platform when user unregistered
 *
 *  @param mail the e-mail of the user
 *  @return a SMEventUserUnregistration object
 */
+ (instancetype _Nonnull)eventWithEmail:(NSString* _Null_unspecified)mail;

/*!
 *  Create a UserUnregistration event object that will be sent to selligent platform when user unregistered
 *
 *  @param mail the e-mail of the user
 *  @param dict a Dictionary containing a string as data that must be stored and managed by platform
 *  If email is not provided you can use in the dictionary an alternate key/value field to search for the user
 *     example: [SMEventUserUnregistration eventWithEmail @"" Dictionary: @{@"userID": @"1234"}];
 *  @return a SMEventUserUnregistration object
 */
+ (instancetype _Nonnull)eventWithEmail:(NSString* _Null_unspecified)mail Dictionary:(NSDictionary<NSString*,NSString*>* _Nullable)dict;

/*!
 *  Create a UserUnregistration event object that will be sent to platform
 *  @param dict a Dictionary containing an alternate key/value field to search for the user
 *     example: [SMEventUserUnregistration eventWithDictionary:@{@"userID": @"1234"}];
 *  @return a SMEventUserUnregistration object
 */
+ (instancetype _Nonnull)eventWithDictionary:(NSDictionary* _Nullable)dict;

@end
