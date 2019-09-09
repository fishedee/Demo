package main

import (
	"fmt"
	"github.com/jmoiron/sqlx"
)

type SqlxDb struct {
	db *sqlx.DB
}

func (this *SqlxDb) Init() {
	var err error
	dsn := fmt.Sprintf("%s:%s@%s(%s:%d)/%s?parseTime=true", USERNAME, PASSWORD, NETWORK, SERVER, PORT, DATABASE)
	this.db, err = sqlx.Connect("mysql", dsn)
	if err != nil {
		panic(err)
	}
}

func (this *SqlxDb) GetAllMaterial() []Material {
	materials := []Material{}
	this.db.Select(&materials, "select materialId,productId from t_material")

	return materials
}

func (this *SqlxDb) GetProduct(productIds []int) []Product {
	products := []Product{}

	query, args, err := sqlx.In("productId in (?)", productIds)
	if err != nil {
		panic(err)
	}
	err = this.db.Select(&products, "select * from t_product where "+query, args...)
	if err != nil {
		panic(err)
	}
	return products
}
