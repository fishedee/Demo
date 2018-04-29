#import "myview.h"

@implementation myView

-(void) drawRect:(NSRect)rect {

	//1.获取上下文
    CGContextRef myContext = [[NSGraphicsContext currentContext] CGContext];  

    //2.设置字体属性
    CGFloat s = 18;
    CTFontRef ctfont = CTFontCreateWithName(CFSTR("STHeitiSC-Medium"), s, NULL);

    CGColorSpaceRef rgbSapceRef = CGColorSpaceCreateDeviceRGB();// RGB 色彩空间
    CGFloat rgbComponents[] = {1, 0, 0, 1};// RGBA 颜色组件
    CGColorRef ctColor = CGColorCreate(rgbSapceRef, rgbComponents);// 一般创建 CGColor

    CFStringRef keys[] = { kCTFontAttributeName,kCTForegroundColorAttributeName };

    CFTypeRef values[] = { ctfont,ctColor};

    CFDictionaryRef attr = CFDictionaryCreate(NULL, (const void **)&keys, (const void **)&values,

                                              sizeof(keys) / sizeof(keys[0]), &kCFTypeDictionaryKeyCallBacks, &kCFTypeDictionaryValueCallBacks);


    //3. 设置文本
    CFStringRef ctStr = CFStringCreateWithCString(nil, [@"你好" UTF8String], kCFStringEncodingUTF8);
    CFAttributedStringRef attrString = CFAttributedStringCreate(NULL,ctStr, attr);
    CTLineRef line = CTLineCreateWithAttributedString(attrString);
    
    //4.绘图
    CGContextSetTextMatrix(myContext, CGAffineTransformIdentity);
    CGContextSetTextPosition(myContext, s, s);
    CTLineDraw(line, myContext);

    

    CFRelease(line);
    CFRelease(attrString);
    CFRelease(ctStr);
}

@end