package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

func ArrayReverse(a interface{}) {
	data := reflect.ValueOf(a)
	dataLen := data.Len()
	dataElemType := data.Type().Elem()
	i := 0
	j := dataLen - 1
	for i < j {
		temp := reflect.New(dataElemType).Elem()
		left := data.Index(i)
		right := data.Index(j)
		temp.Set(left)
		left.Set(right)
		right.Set(temp)
		i++
		j--
	}
}

func ArrayReverseFastReflect(a interface{}) {
	dataOperator := getReflectType(a)
	dataLen := dataOperator.GetLen(a)
	i := 0
	j := dataLen - 1
	for i < j {
		dataOperator.Swap(a, i, j)
		i++
		j--
	}
}

//简易反射思路
type reflectOperator struct {
	GetLen func(a interface{}) int
	Swap   func(a interface{}, i int, j int)
}

type emptyInterface struct {
	t *int
}

func getType(a interface{}) *int {
	e := *(*emptyInterface)(unsafe.Pointer(&a))
	return e.t
}

var typeMapper = map[*int]reflectOperator{}

func getReflectType(a interface{}) reflectOperator {
	operator, isExist := typeMapper[getType(a)]
	if isExist == false {
		panic("unkown type:" + reflect.TypeOf(a).String())
	}
	return operator
}

func addReflectType(a interface{}, b reflectOperator) {
	typeMapper[getType(a)] = b
}

func main() {
	fmt.Println(getType(1))
	fmt.Println(getType(123))
	fmt.Println(getType("34"))
}
