package main

import (
	"fmt"
	. "github.com/fishedee/language"
	"github.com/jmoiron/sqlx"
)

type SqlxDb struct {
	db *sqlx.DB
}

func (this *SqlxDb) Init() {
	var err error
	dsn := fmt.Sprintf("%s:%s@%s(%s:%d)/%s", USERNAME, PASSWORD, NETWORK, SERVER, PORT, DATABASE)
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

	sqlArgv := []string{}
	argv := []interface{}{}
	for i := 0; i != len(productIds); i++ {
		sqlArgv = append(sqlArgv, "?")
		argv = append(argv, productIds[i])
	}
	this.db.Select(&products, "select productId,nameId,name,namePrint,itemCategoryId,salesUnitId,salesSubUnitId,purchaseUnitId,purchaseSubUnitId,stockUnitId,itemPropertyId,unitConvertId,isAutoPutOnShelf,sumId,remark,suggestPrice,subSuggestPrice from t_product where productId in ("+Implode(sqlArgv, ",")+")", argv...)

	return products
}
