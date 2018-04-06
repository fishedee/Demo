import sys
import os
import time

fd = 3
print ('fd:', fd)

f = os.fdopen(3,"w")
count = 1
while True:
	f.write("python3 hello world %d\n"%count)
	f.flush()
	count+=1
	time.sleep(1)
