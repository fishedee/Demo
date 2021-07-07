package main

import (
	"testing"
	"unsafe"
)

func TestOriginInt(t *testing.T) {
	data := []struct {
		input  int
		input2 int
		output int
	}{
		{1, 2, 3},
		{4, 5, 9},
	}
	for _, single := range data {
		result := AddInt(single.input, single.input2)
		if result != single.output {
			t.Error("fail")
		}
	}
}

func TestOriginFloat32(t *testing.T) {
	data := []struct {
		input  float32
		input2 float32
		output float32
	}{
		{1.2, 2.3, 3.5},
		{4.6, 5.1, 9.7},
	}
	for _, single := range data {
		result := AddFloat(single.input, single.input2)
		if result != single.output {
			t.Error("fail")
		}
	}
}

func TestGenericInt(t *testing.T) {
	data := []struct {
		input  int
		input2 int
		output int
	}{
		{1, 2, 3},
		{4, 5, 9},
	}
	for _, single := range data {
		resultPointer := GenericAdd(GenericAddDict{
			T:   IntType,
			Add: IntAdd,
		}, unsafe.Pointer(&single.input), unsafe.Pointer(&single.input2))
		if *(*int)(resultPointer) != single.output {
			t.Error("fail")
		}
	}
}

func TestGenericFloat32(t *testing.T) {
	data := []struct {
		input  float32
		input2 float32
		output float32
	}{
		{1.2, 2.3, 3.5},
		{4.6, 5.1, 9.7},
	}
	for _, single := range data {
		resultPointer := GenericAdd(GenericAddDict{
			T:   Float32Type,
			Add: Float32Add,
		}, unsafe.Pointer(&single.input), unsafe.Pointer(&single.input2))
		if *(*float32)(resultPointer) != single.output {
			t.Error("fail")
		}
	}
}
