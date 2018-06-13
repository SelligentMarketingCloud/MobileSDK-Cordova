#import <Foundation/Foundation.h>
#import "ParsableObject.h"

typedef enum EventType : NSInteger {
    etRegister = 90,
    etUnregister = 91,
    etUserLogin = 92,
    etUserLogout = 93,
    etCustom = 94,
} EventType;

@interface Event : NSObject<ParsebleObject>

@property (nonatomic, readonly) EventType type;
@property (nonatomic, strong, readonly) NSString *email;
@property (nonatomic, strong, readonly) NSDictionary *data;
@property (nonatomic, readonly) BOOL shouldCache;

@end
