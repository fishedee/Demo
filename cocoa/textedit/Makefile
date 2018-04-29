run:package
	open main.app
package:build
	rm -rf main.app
	mkdir  main.app	
	mkdir  main.app/Contents
	mkdir  main.app/Contents/MacOS/
	cp main main.app/Contents/MacOS/
	cp Info.plist main.app/Contents/
build:
	clang -framework Cocoa -o main main.m myview.m mywindow.m
