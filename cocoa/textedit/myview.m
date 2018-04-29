//
//  myview.m
//  textedit
//
//  Created by fishedee on 29/4/2018.
//  Copyright © 2018 fishedee. All rights reserved.
//
#import "myview.h"

static const NSRange kEmptyRange = {NSNotFound, 0};

@implementation myview

- (id) initWithFrame: (NSRect) frameRect {
    if (self = [super initWithFrame:frameRect]) {
        _text = [[NSMutableAttributedString alloc] init];
        _selectedRange = _markedRange = kEmptyRange;
    }
    return self;
}

- (void) updateWithDefaultTextAttributes {
    const NSRange entireRange = NSMakeRange(0, [_text length]);
    
    [_text removeAttribute: NSFontAttributeName
                     range: entireRange];
    [_text addAttribute: NSFontAttributeName
                  value: [NSFont userFontOfSize: 18.0f]
                  range: entireRange];
}

- (void) drawRect: (NSRect) theRect {
    [[NSColor whiteColor] set];
    NSFrameRect(theRect);
    
    NSRectFill(theRect);
    [[NSColor grayColor] set];
    NSFrameRect(theRect);
    
    [self updateWithDefaultTextAttributes];
    [_text drawInRect: NSMakeRect(
                                  theRect.origin.x + 5.0f, theRect.origin.y,
                                  theRect.size.width, theRect.size.height)];
}


// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------
- (void) removeMarkedText {
    if (_markedRange.location != NSNotFound) {
        if (NSMaxRange(_markedRange) <= [_text length])
            [_text deleteCharactersInRange: _markedRange];
        _markedRange = _selectedRange = kEmptyRange;
    }
}

- (void) appendCharacters: (id) aString {
    if ([aString isKindOfClass: [NSAttributedString class]]) {
        [_text appendAttributedString: aString];
    } else {
        [[_text mutableString] appendString: aString];
    }
}

- (void) replaceCharactersInRange: (NSRange) aRange
                         withText: (id) aString
                   effectiveRange: (NSRangePointer) effectiveRange
{
    NSRange replacementRange = aRange;
    
    if (replacementRange.location == NSNotFound) {
        replacementRange.location = [_text length];
        replacementRange.length = 0;
    }
    
    if ([aString isKindOfClass: [NSAttributedString class]]) {
        [_text replaceCharactersInRange: replacementRange
                   withAttributedString: aString];
    } else {
        [_text replaceCharactersInRange: replacementRange
                             withString: aString];
    }
    
    if (effectiveRange != NULL) {
        *effectiveRange = NSMakeRange(replacementRange.location, [aString length]);
    }
}

/**
 * If there is no marked text, the current selection is replaced.
 * If there is no selection, the string is inserted at the insertion point.
 *
 * @param replacementRange The range to replace, computed from
 *                         the beginning of the marked text.
 */
- (NSRange) replacementMarkedRange: (NSRange) replacementRange {
    NSRange markedRange = _markedRange;
    
    if (markedRange.location == NSNotFound) markedRange = _selectedRange;
    if (replacementRange.location != NSNotFound) {
        NSRange newRange = markedRange;
        newRange.location += replacementRange.location;
        newRange.length += replacementRange.length;
        if (NSMaxRange(newRange) <= NSMaxRange(markedRange)) {
            markedRange = newRange;
        }
    }
    
    return markedRange;
}

// ----------------------------------------------------------------
// NSResponder
// ----------------------------------------------------------------
- (BOOL) acceptsFirstResponder {
    return YES;
}

- (void) keyDown: (NSEvent *) theEvent {
    [self interpretKeyEvents: [NSArray arrayWithObject: theEvent]];
}


- (void) deleteBackward: (id) sender {
    const NSUInteger length = [_text length];
    
    if (length > 0) {
        [_text deleteCharactersInRange: NSMakeRange(length - 1, 1)];
        [self setNeedsDisplay: YES];
    }
}

- (void) insertNewline: (id) sender {
    [self insertText: @"\n"];
}

- (void) insertTab: (id) sender {
    [self insertText: @"\t"];
}

- (void) insertText: (id) aString {
    [self appendCharacters: aString];
    [self setNeedsDisplay: YES];
}


// ----------------------------------------------------------------
// NSTextInput
// ----------------------------------------------------------------
- (void) doCommandBySelector: (SEL) aSelector {
    [super doCommandBySelector: aSelector];
}

- (void) setMarkedText: (id) aString selectedRange: (NSRange) selRange {
    [self setMarkedText: aString
          selectedRange: selRange
       replacementRange: kEmptyRange];
}

- (void) unmarkText {
}

- (BOOL) hasMarkedText {
    return _markedRange.location != NSNotFound;
}

- (NSInteger) conversationIdentifier {
    return (NSInteger) self;
}

- (NSAttributedString *) attributedSubstringFromRange: (NSRange) theRange {
    return [self attributedSubstringForProposedRange:theRange actualRange:NULL];
}

- (NSRange) markedRange {
    return _markedRange;
}

- (NSRange) selectedRange {
    return _selectedRange;
}

- (NSRect) firstRectForCharacterRange: (NSRange) theRange {
    return [self firstRectForCharacterRange:theRange actualRange:NULL];
}

- (NSUInteger) characterIndexForPoint: (NSPoint) thePoint {
    return 0;
}

- (NSArray *) validAttributesForMarkedText {
    return [NSArray array];
}


// ----------------------------------------------------------------
// NSTextInputClient (Mac OS X 10.5)
// ----------------------------------------------------------------
- (void) insertText: (id) aString
   replacementRange: (NSRange) replacementRange
{
    [self removeMarkedText];
    [self replaceCharactersInRange: replacementRange
                          withText: aString
                    effectiveRange: NULL];
    [self setNeedsDisplay: YES];
}

- (void) setMarkedText: (id) aString
         selectedRange: (NSRange) selectedRange
      replacementRange: (NSRange) replacementRange
{
    NSRange effectiveRange;
    
    [self replaceCharactersInRange: [self replacementMarkedRange: replacementRange]
                          withText: aString
                    effectiveRange: &effectiveRange];
    _selectedRange = selectedRange;
    _markedRange = effectiveRange;
    [self setNeedsDisplay: YES];
}

- (NSAttributedString *) attributedSubstringForProposedRange: (NSRange) aRange
                                                 actualRange: (NSRangePointer) actualRange
{
    return [[NSAttributedString alloc] init] ;
}

- (NSRect) firstRectForCharacterRange: (NSRange) aRange
                          actualRange: (NSRangePointer) actualRange
{
    return NSMakeRect(500,500, 100, 100);
}

- (NSAttributedString *) attributedString {
    return _text;
}

@end
