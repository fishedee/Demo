#import <Cocoa/Cocoa.h>
@interface myview : NSView <NSTextInput, NSTextInputClient> {
    NSMutableAttributedString *_text;
    NSRange _selectedRange;
    NSRange _markedRange;
}

@end