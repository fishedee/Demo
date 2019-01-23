package main

import (
	. "github.com/fishedee/assert"
	"testing"
)

type MM struct {
	Id  int
	Age int
}

func ArrayRevseMM(a []MM) {
	dataLen := len(a)
	i := 0
	j := dataLen - 1
	for i < j {
		temp := a[i]
		a[i] = a[j]
		a[j] = temp
		i++
		j--
	}
}

func init() {
	//以下的这个addReflectType可以通过go generate自动生成
	addReflectType([]MM{}, reflectOperator{
		GetLen: func(a interface{}) int {
			return len(a.([]MM))
		},
		Swap: func(a interface{}, i int, j int) {
			data := a.([]MM)
			temp := data[i]
			data[i] = data[j]
			data[j] = temp
		},
	})
}

func getInitData() []MM {
	data := []MM{}
	for i := 0; i != 1000; i++ {
		data = append(data, MM{
			Id:  i,
			Age: i + 1,
		})
	}
	return data
}

func TestReverse(t *testing.T) {
	data1 := getInitData()
	data2 := getInitData()
	data3 := getInitData()

	ArrayRevseMM(data1)
	ArrayReverse(data2)
	ArrayReverseFastReflect(data3)

	AssertEqual(t, data1, data2)
	AssertEqual(t, data1, data3)
}

func BenchmarkReverseOrigin(b *testing.B) {
	data := getInitData()
	b.ResetTimer()
	for i := 0; i != b.N; i++ {
		ArrayRevseMM(data)
	}
}

func BenchmarkReverseReflect(b *testing.B) {
	data := getInitData()
	b.ResetTimer()
	for i := 0; i != b.N; i++ {
		ArrayReverse(data)
	}
}

func BenchmarkReverseFastReflect(b *testing.B) {
	data := getInitData()
	b.ResetTimer()
	for i := 0; i != b.N; i++ {
		ArrayReverseFastReflect(data)
	}
}
