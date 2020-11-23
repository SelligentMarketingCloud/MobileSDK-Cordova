//
//  SMInAppContent.h
//  MobileSDK
//
//  Created by Gilbert Schakal on 15/03/16.
//  Copyright © 2016 Selligent. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SMBaseMessage.h"
#import "SMInAppContentType.h"
#import "SMDisplayMode.h"

/*!
 *  #SMInAppContentMessage :#
 */
@interface SMInAppContentMessage : SMBaseMessage

/*!
 *  NSString instance providing the title of the message
 */
@property (nonatomic) NSString * title;

/*!
 *  NSString instance providing the content of the message
 */
@property (nonatomic) NSString * body;

/*!
 *  NSString instance providing the category of the message
 */
@property (nonatomic) NSString * category;

/*!
 *  SMInAppContentType instance providing the in app content type of the message
 */
@property (nonatomic) SMInAppContentType  iacType;

/*!
 *  NSDate instance providing the expiration date of the message
 *  @deprecated Deprecated use expirationDate on SMBaseMessage instead
 */
@property (nonatomic) NSDate   * contentExpiration __deprecated __deprecated_msg("Use expirationDate instead.");

/*!
 *  NSDate instance providing the creation date of the message
 *  @deprecated Deprecated use creationDate on SMBaseMessage instead
 */
@property (nonatomic) NSDate   * contentCreation __deprecated __deprecated_msg("Use creationDate instead.");

/*!
 *  NSArray of SMLink objects
 */
@property (nonatomic) NSArray  * arrayIACLinks;

@end
