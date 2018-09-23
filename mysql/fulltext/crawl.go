package main

import (
	"fmt"
	. "github.com/fishedee/app/database"
	. "github.com/fishedee/language"
	. "github.com/fishedee/util"
	"time"
)

type Recipe struct {
	RecipeId   int `xorm:"autoincr"`
	ClientId   int
	Title      string
	Summary    string
	CreateTime time.Time `xorm:"created"`
	ModifyTime time.Time `xorm:"updated"`
}

type CrawlRecipe struct {
	ClientId     int
	ClientName   string
	CoverTitle   string
	coverImage   string
	CoverSummary string
}

type CrawlResponse struct {
	Code int
	Data struct {
		Count int
		Data  []CrawlRecipe
	}
}

func crawlRecipe() []CrawlRecipe {
	var data CrawlResponse
	err := DefaultAjaxPool.Get(&Ajax{
		Url:              "https://api.hongbeibang.com/recommend/getContent?_t=1537712981279&pageIndex=0&pageSize=10000",
		ResponseDataType: "json",
		ResponseData:     &data,
	})
	if err != nil {
		Throw(1, err.Error())
	}
	return data.Data.Data
}

func saveDatabase(db Database, recipes []Recipe) {
	db.MustInsert(recipes)
}

func main() {
	defer CatchCrash(func(e Exception) {
		fmt.Printf("fail %v\n", e.Error())
	})
	db, err := NewDatabase(DatabaseConfig{
		Driver:   "mysql",
		Host:     "localhost",
		Port:     3306,
		User:     "root",
		Passowrd: "12345678",
		Database: "MySqlTest",
		//Charset:  "utf8mb4",
	})
	if err != nil {
		panic(err)
	}
	recipes := crawlRecipe()
	myRecipes := []Recipe{}
	for _, single := range recipes {
		myRecipes = append(myRecipes, Recipe{
			ClientId: single.ClientId,
			Title:    single.CoverTitle,
			Summary:  single.CoverSummary,
		})
	}
	saveDatabase(db, myRecipes)
	fmt.Println("finish!")
}
