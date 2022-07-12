package insert_sort

import (
	"testing"
	"math/rand"
	"fmt"
	"time"
)

func generateData(n int) []int{
	data := make([]int,n,n)
	for i := 0 ;i < n;i++{
		data[i] = rand.Intn(100)
	}
	return data
}

func TestStack(t *testing.T){
	rand.Seed(time.Now().Unix())

	data := generateData(100)
	output1 := MonoIncrStack(data)
	
	output2 := InsertSort(data)
	fmt.Println(output1)
	fmt.Println(output2)
}

func BenchmarkMonoIncrStack(b *testing.B){
	initData := generateData(1000)

	b.ResetTimer()

	for i :=0;i!= b.N;i++{
		MonoIncrStack(initData)
	}
}

func BenchmarkInsertSort(b *testing.B){
	initData := generateData(1000)

	b.ResetTimer()

	for i :=0;i!= b.N;i++{
		InsertSort(initData)
	}
}