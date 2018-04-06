package main

import (
	"fmt"
	"os"
	"time"
)

type filer interface {
	File() (*os.File, error)
}

func main() {
	pipe := os.NewFile(uintptr(3), "pipe")

	for count := 1; ; count++ {
		pipe.WriteString(fmt.Sprintf("Go Hello World :%v\n", count))
		time.Sleep(time.Second)
	}
}
