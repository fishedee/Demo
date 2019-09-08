package main

import (
	. "github.com/fishedee/language"
)

type Material struct {
	MaterialId int `db:"materialId"`
	ProductId  int `db:"productId"`
}

type Product struct {
	ProductId         int     `db:"productId"`
	NameId            string  `db:"nameId"`
	Name              string  `db:"name"`
	NamePrint         string  `db:"namePrint"`
	ItemCategoryId    int     `db:"itemCategoryId"`
	SalesUnitId       int     `db:"salesUnitId"`
	SalesSubUnitId    int     `db:"salesSubUnitId"`
	PurchaseUnitId    int     `db:"purchaseUnitId"`
	PurchaseSubUnitId int     `db:"purchaseSubUnitId"`
	StockUnitId       int     `db:"stockUnitId"`
	ItemPropertyId    int     `db:"itemPropertyId"`
	UnitConvertId     int     `db:"unitConvertId"`
	IsAutoPutOnShelf  int     `db:"isAutoPutOnShelf"`
	SumId             int     `db:"sumId"`
	Remark            string  `db:"remark"`
	SuggestPrice      Decimal `db:"suggestPrice"`
	SubSuggestPrice   Decimal `db:"subSuggestPrice"`
}
