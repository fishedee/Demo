package main

import (
	"fmt"
	. "github.com/fishedee/language"
	"time"
)

type DbDriver interface {
	Init()
	GetAllMaterial() []Material
	GetProduct(productIds []int) []Product
}

func runTest(db DbDriver) {
	materials := db.GetAllMaterial()
	productIds := QueryColumn(materials, "ProductId").([]int)
	products := db.GetProduct(productIds)
	fmt.Printf("all Products len %v\n", len(products))
}

func main() {
	dbDrivers := []DbDriver{
		&PureDb{},
		&XormDb{},
		&SqlxDb{},
		&Sqlx2Db{},
	}

	for i, single := range dbDrivers {
		single.Init()

		time1 := time.Now()
		runTest(single)
		time2 := time.Now()
		duration := time2.Sub(time1)
		fmt.Printf("case %v : elaspes time %v\n", i, duration)
	}

}
