package main

import (
	"fmt"
	"unsafe"
)

type RuntimeType struct {
	Name string
}

//以下的都是常量，创建一次后不需要再创建
var IntType = &RuntimeType{Name: "int"}

var Float32Type = &RuntimeType{Name: "float32"}

var IntAdd = func(left *RuntimeType, leftData unsafe.Pointer, right *RuntimeType, rightData unsafe.Pointer) unsafe.Pointer {
	a := *(*int)(leftData)
	b := *(*int)(rightData)
	c := a + b
	return unsafe.Pointer(&c)
}

var Float32Add = func(left *RuntimeType, leftData unsafe.Pointer, right *RuntimeType, rightData unsafe.Pointer) unsafe.Pointer {
	a := *(*float32)(leftData)
	b := *(*float32)(rightData)
	c := a + b
	return unsafe.Pointer(&c)
}

type GenericAddDict struct {
	T   *RuntimeType
	Add func(left *RuntimeType, leftData unsafe.Pointer, right *RuntimeType, rightData unsafe.Pointer) unsafe.Pointer
}

func GenericAdd(dict GenericAddDict, leftData unsafe.Pointer, rightData unsafe.Pointer) unsafe.Pointer {
	fmt.Println("GenericAdd type : " + dict.T.Name)
	return dict.Add(dict.T, leftData, dict.T, rightData)
}
