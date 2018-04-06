package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"os/exec"
)

type filer interface {
	File() (*os.File, error)
}

func main() {
	r, w, err := os.Pipe()
	if err != nil {
		panic(err)
	}
	//cmd := exec.Command("go", "run", "client.go", fmt.Sprintf("%v", w.Fd()))
	cmd := exec.Command("python3", "client.py", fmt.Sprintf("%v", w.Fd()))
	cmd.ExtraFiles = []*os.File{w}
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	go func() {
		err := cmd.Run()
		fmt.Printf("child exit! %v\n", err)
	}()
	r2 := bufio.NewReader(r)
	for {
		data, err := r2.ReadString('\n')
		if err != nil {
			if err == io.EOF {
				break
			} else {
				panic(err)
			}
		}
		fmt.Println("pipe:" + data)
	}
}
