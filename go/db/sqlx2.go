package main

import (
	"fmt"
	"github.com/jmoiron/sqlx"
)

type Sqlx2Db struct {
	db *sqlx.DB
}

func (this *Sqlx2Db) Init() {
	var err error
	dsn := fmt.Sprintf("%s:%s@%s(%s:%d)/%s", USERNAME, PASSWORD, NETWORK, SERVER, PORT, DATABASE)
	this.db, err = sqlx.Connect("mysql", dsn)
	if err != nil {
		panic(err)
	}
}

func (this *Sqlx2Db) GetAllMaterial() []Material {
	materials := []Material{}
	this.db.Select(&materials, "select materialId,productId from t_material")

	return materials
}

func (this *Sqlx2Db) GetProduct(productIds []int) []Product {
	products := []Product{}

	this.db.Select(&products, "select productId,nameId,name,namePrint,itemCategoryId,salesUnitId,salesSubUnitId,purchaseUnitId,purchaseSubUnitId,stockUnitId,itemPropertyId,unitConvertId,isAutoPutOnShelf,sumId,remark,suggestPrice,subSuggestPrice from t_product")

	return products
}
