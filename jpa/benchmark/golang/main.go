package main

import (
	"encoding/json"
	"fmt"
	. "github.com/fishedee/app/log"
	. "github.com/fishedee/app/sqlf"
	. "github.com/fishedee/language"
	_ "github.com/lib/pq"
	"io/ioutil"
	"strconv"
	"strings"
	"time"
)

type Item struct {
	Id                int `sqlf:"autoincr"`
	Number            string
	Name              string
	IsCategory        byte      `sqlname:"is_category"`
	IsSystem          byte      `sqlname:"is_system"`
	TreeLevel         int       `sqlname:"tree_level"`
	TreePath          string    `sqlname:"tree_path"`
	ParentId          int       `sqlname:"parent_id"`
	ModelRemark       string    `sqlname:"model_remark"`
	SpecsRemark       string    `sqlname:"specs_remark"`
	Remark            string    `sqlname:"remark"`
	BasicUnitId       int       `sqlname:"basic_unit_id"`
	BasicUnitName     string    `sqlname:"basic_unit_name"`
	CommonUnitId      int       `sqlname:"common_unit_id"`
	CommonUnitName    string    `sqlname:"common_unit_name"`
	CommonUnitConvert Decimal   `sqlname:"common_unit_convert"`
	UnitConvertDesc   string    `sqlname:"unit_convert_desc"`
	IsRegularType     int       `sqlname:"is_regular_type"`
	HasBusinessLink   int       `sqlname:"has_business_link"`
	IsEnabled         string    `sqlname:"is_enabled"`
	CreateTime        time.Time `sqlf:"created" sqlname:"create_time"`
	ModifyTime        time.Time `sqlf:"updated" sqlname:"modify_time"`

	UnitConverts []ItemUnitConvert
	Aliases      []ItemContactAlias
}

type ItemUnitConvert struct {
	Id                string
	CreateTime        time.Time `sqlf:"created" sqlname:"create_time"`
	ModifyTime        time.Time `sqlf:"updated" sqlname:"modify_time"`
	ItemId            int       `sqlname:"item_id"`
	UnitId            int       `sqlname:"unit_id"`
	UnitName          string    `sqlname:"unit_name"`
	UnitConvert       Decimal   `sqlname:"unit_convert"`
	IsBasic           int       `sqlname:"is_basic"`
	IsCommon          int       `sqlname:"is_common"`
	CanBusinessLink   int       `sqlname:"can_business_link"`
	HasBusinessLink   int       `sqlname:"has_business_link"`
	IsEnabled         string    `sqlname:"is_enabled"`
	WholeSalesPrice   *Decimal  `sqlname:"whole_sales_price"`
	UnitConvertsOrder int       `sqlname:"unit_converts_order"`
	UnitConvertDesc   string    `sqlname:"unit_convert_desc"`
}

type ItemContactAlias struct {
	Id              string
	CreateTime      time.Time `sqlf:"created" sqlname:"create_time"`
	ModifyTime      time.Time `sqlf:"updated" sqlname:"modify_time"`
	ItemId          int       `sqlname:"item_id"`
	ContactId       int       `sqlname:"contact_id"`
	AliasItemName   string    `sqlname:"alias_item_name"`
	AliasItemNumber string    `sqlname:"alias_item_number"`
	AliasOrder      string    `sqlname:"aliases_order"`
}

func getData(db SqlfDB) []Item {
	items := []Item{}
	db.MustQuery(&items, "select * from item")

	itemIds := make([]string, len(items), len(items))
	for i, item := range items {
		itemIds[i] = strconv.Itoa(item.Id)
	}

	itemUnitConverts := []ItemUnitConvert{}
	sql1 := fmt.Sprintf("select * from item_unit_convert where item_id in (%s)", strings.Join(itemIds, ","))
	db.MustQuery(&itemUnitConverts, sql1)
	itemUnitConvertsMap := map[int][]ItemUnitConvert{}
	for _, single := range itemUnitConverts {
		oldList, isExist := itemUnitConvertsMap[single.ItemId]
		if !isExist {
			oldList = []ItemUnitConvert{}
		}
		oldList = append(oldList, single)
		itemUnitConvertsMap[single.ItemId] = oldList
	}

	itemContactAlias := []ItemContactAlias{}
	sql2 := fmt.Sprintf("select * from item_contact_alias where item_id in (%s)", strings.Join(itemIds, ","))
	db.MustQuery(&itemContactAlias, sql2)
	itemContactAliasMap := map[int][]ItemContactAlias{}
	for _, single := range itemContactAlias {
		oldList, isExist := itemContactAliasMap[single.ItemId]
		if !isExist {
			oldList = []ItemContactAlias{}
		}
		oldList = append(oldList, single)
		itemContactAliasMap[single.ItemId] = oldList
	}
	for i, item := range items {
		itemId := item.Id
		item.UnitConverts = itemUnitConvertsMap[itemId]
		item.Aliases = itemContactAliasMap[itemId]
		items[i] = item
	}
	return items
}

func goBenchmark(db SqlfDB){
	beginTime := time.Now()
	list := getData(db)
	endTime := time.Now()

	duration := endTime.Sub(beginTime)
	json, err := json.Marshal(list)
	if err != nil {
		panic(err)
	}
	fmt.Printf("duration [%v], dataSize:[%v], dataLength:[%v]\n", duration, len(list), len(json))
	ioutil.WriteFile("output.txt", json, 0666)
}

func main() {
	log, err := NewLog(LogConfig{
		Driver: "console",
	})
	if err != nil {
		panic(err)
	}
	db, err := NewSqlfDB(log, nil, SqlfDBConfig{
		Driver:     "postgres",
		SourceName: "host=localhost port=5432 user=postgres password=123 dbname=trade_erp client_encoding=utf8 sslmode=disable",
		Debug:      false,
	})
	if err != nil {
		panic(err)
	}
	for i := 0 ;i != 10;i++{
		goBenchmark(db);
	}
}
