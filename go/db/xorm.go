package main

import (
	. "github.com/fishedee/app/database"
)

type XormDb struct {
	db Database
}

func (this *XormDb) Init() {
	var err error
	this.db, err = NewDatabase(DatabaseConfig{
		Driver:   "mysql",
		Host:     "localhost",
		Port:     3306,
		User:     "root",
		Password: "Yinghao23367847",
		Database: "Yinghao",
	})
	if err != nil {
		panic(err)
	}
}

func (this *XormDb) GetAllMaterial() []Material {
	materials := []Material{}
	this.db.MustFind(&materials)

	return materials
}

func (this *XormDb) GetProduct(productIds []int) []Product {
	products := []Product{}

	this.db.In("productId", productIds).MustFind(&products)
	return products
}
