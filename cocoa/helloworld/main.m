#import <Cocoa/Cocoa.h>
  
int main(int argc, const char * argv[]) {  
    @autoreleasepool {
  NSWindow *window = [[NSWindow alloc] initWithContentRect:NSMakeRect(50, 100, 200, 300)
     styleMask:NSWindowStyleMaskTitled | NSWindowStyleMaskResizable
      backing:NSBackingStoreBuffered
         defer:YES];

         NSTextField *text=[[NSTextField alloc] initWithFrame:NSMakeRect(10, 60, 180, 32)];
         text.stringValue = @"Hello World";
         NSButton *button = [[NSButton alloc] initWithFrame:NSMakeRect(10, 10, 180, 32)];
         [button setBezelStyle:NSRoundedBezelStyle];
         [button setTitle:@"Quit"];
         [button setTarget:NSApp];
         [button setAction:@selector(terminate:)];

         [window setTitle:@"test1"];

         [[window contentView] addSubview:text];
         [[window contentView] addSubview:button];

         [NSApplication sharedApplication];
         [window makeKeyAndOrderFront:nil];
         [NSApp run];
  }
  return 0;
}  