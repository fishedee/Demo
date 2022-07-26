package main

import (
	"fmt"
	"github.com/shopspring/decimal"
)

type Problem struct {
	Price decimal.Decimal
	Count decimal.Decimal
	MultiCount []decimal.Decimal
}

func (problem *Problem) Solve2() []decimal.Decimal{
	result := []decimal.Decimal{}

	for _,singleCount := range problem.MultiCount{
		singleResult := singleCount.Mul(problem.Price).Round(2)
		result = append(result,singleResult)
	}
	return result
}

func (problem *Problem) CheckSolve(result []decimal.Decimal){
	sum,_ := decimal.NewFromString("0")
	for _,singleResult := range result{
		sum = sum.Add(singleResult)
	}
	total := problem.Price.Mul(problem.Count).Round(2)
	fmt.Printf("\nsolution: %v\n",result)
	if total.Cmp(sum) != 0 {
		fmt.Printf("solve fail: total %v != sum %v\n",total,sum)
	}else{
		fmt.Printf("solve success: total = %v\n",total)
	}
}

func (problem *Problem)Solve() []decimal.Decimal {
	result := []decimal.Decimal{}
	
	total := problem.Price.Mul(problem.Count).Round(2)
	count := problem.Count

	for _,singleCount := range problem.MultiCount{

		//计算当前的值
		precent := singleCount.Div(count)
		singleResult := precent.Mul(total).Round(2)
		result = append(result,singleResult)

		//取余额
		count = count.Sub(singleCount)
		total = total.Sub(singleResult)
	}

	return result;
}

func NewProblem(price decimal.Decimal,count decimal.Decimal, multiCount []decimal.Decimal) *Problem{
	if price.Sign() < 0 {
		panic("price can not be negative")
	}

	if count.Sign() < 0 {
		panic("count can not be negative")
	}

	allCount,_ :=  decimal.NewFromString("0")
	for _,it := range multiCount{
		if it.Sign() < 0{
			panic("multiCount can not be negative")
		}
		allCount = allCount.Add(it)
	}
	if allCount.Cmp( count) != 0 {
		panic("multi count sum != count")
	}
	problem := &Problem{}
	problem.Price = price
	problem.Count = count
	problem.MultiCount = multiCount
	return problem
}

func newDecimal(a string) decimal.Decimal{
	re,err := decimal.NewFromString(a)
	if err != nil{
		panic(err)
	}
	return re
}

func main(){
	problem := NewProblem(
		newDecimal("32.23"),
		newDecimal("10.12"),
		[]decimal.Decimal{newDecimal("0.01"),newDecimal("0.01"),newDecimal("10.1")},
	)

	//分摊法
	result1 := problem.Solve()
	problem.CheckSolve(result1)

	//原始法
	result2 := problem.Solve2()
	problem.CheckSolve(result2)
}