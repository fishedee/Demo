package main

import (
	"database/sql"
	"fmt"
	. "github.com/fishedee/language"
	_ "github.com/go-sql-driver/mysql"
	"time"
)

const (
	USERNAME = "root"
	PASSWORD = "Yinghao23367847"
	NETWORK  = "tcp"
	SERVER   = "localhost"
	PORT     = 3306
	DATABASE = "Yinghao"
)

type PureDb struct {
	db *sql.DB
}

func (this *PureDb) Init() {
	dsn := fmt.Sprintf("%s:%s@%s(%s:%d)/%s", USERNAME, PASSWORD, NETWORK, SERVER, PORT, DATABASE)
	DB, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}
	DB.SetConnMaxLifetime(100 * time.Second)
	DB.SetMaxOpenConns(100)
	DB.SetMaxIdleConns(16)
	this.db = DB
}

func (this *PureDb) GetAllMaterial() []Material {
	materials := []Material{}
	row, err := this.db.Query("select materialId,productId from t_material")
	if err != nil {
		panic(err)
	}
	for row.Next() {
		materialRow := Material{}
		err := row.Scan(&materialRow.MaterialId, &materialRow.ProductId)
		if err != nil {
			panic(err)
		}
		materials = append(materials, materialRow)
	}

	return materials
}

func (this *PureDb) GetProduct(productIds []int) []Product {
	products := []Product{}
	sqlArgv := []string{}
	argv := []interface{}{}
	for i := 0; i != len(productIds); i++ {
		sqlArgv = append(sqlArgv, "?")
		argv = append(argv, productIds[i])
	}
	row, err := this.db.Query("select productId,nameId,name,namePrint,itemCategoryId,salesUnitId,salesSubUnitId,purchaseUnitId,purchaseSubUnitId,stockUnitId,itemPropertyId,unitConvertId,isAutoPutOnShelf,sumId,remark,suggestPrice,subSuggestPrice from t_product where productId in ("+Implode(sqlArgv, ",")+")", argv...)
	if err != nil {
		panic(err)
	}
	for row.Next() {
		product := Product{}
		err := row.Scan(&product.ProductId,
			&product.NameId,
			&product.Name,
			&product.NamePrint,
			&product.ItemCategoryId,
			&product.SalesUnitId,
			&product.SalesSubUnitId,
			&product.PurchaseUnitId,
			&product.PurchaseSubUnitId,
			&product.StockUnitId,
			&product.ItemPropertyId,
			&product.UnitConvertId,
			&product.IsAutoPutOnShelf,
			&product.SumId,
			&product.Remark,
			&product.SuggestPrice,
			&product.SubSuggestPrice,
		)
		if err != nil {
			panic(err)
		}
		products = append(products, product)
	}
	return products
}
