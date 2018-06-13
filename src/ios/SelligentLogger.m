#import "SelligentLogger.h"

@implementation SelligentLogger

+ (void)log:(NSString *)logMessage {
    NSLog(@"SelligentPlugin: %@", logMessage);
}

@end
