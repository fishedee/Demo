package main

import (
	"fmt"
	. "github.com/fishedee/language"
	"github.com/shopspring/decimal"
)

func test1(){
	n := 0.111111111111
	total := 0.0
	for i := 0 ; i != 100000 ;i ++{
		total = AddDecimal(total,n)
	}
	fmt.Println(total)
}

func test2(){
	n,_ := decimal.NewFromString("0.111111111111")
	total,_ := decimal.NewFromString("0.0")
	for i := 0 ;i != 100000 ; i ++{
		total = total.Add(n)
	}
	fmt.Println(total)
}

func test3(){
	n := "0.111111111111"
	total := "0.0"
	for i := 0 ;i != 100000 ; i ++{
		nTemp,_ := decimal.NewFromString(n)
		totalTemp,_ := decimal.NewFromString(total)
		totalTemp = totalTemp.Add(nTemp)
		total = totalTemp.String()
	}
	fmt.Println(total)
}

func main(){
	test1();
	test2();
	test3();
}
