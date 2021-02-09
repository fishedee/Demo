package main

import (
	"database/sql"
	"encoding/json"
	//"fmt"
	_ "github.com/lib/pq"
	"io/ioutil"
)

func connectDB() *sql.DB {
	db, err := sql.Open("postgres", "host=localhost port=5432 user=fish sslmode=disable")
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}
	return db
}

type Recipe struct {
	ContentId  int    `json:"contentId"`
	Title      string `json:"title"`
	ClientName string `json:"clientName"`
	Summary    string `json:"summary"`
	Tip        string `json:"tip"`
}

/*
func query(db *sql.DB) {
	rows, err := db.Query("select contentId,summary from t_recipe")

	if err != nil {
		panic(err)
	}
	defer rows.Close()

	result := []Recipe{}
	single := Recipe{}

	for rows.Next() {
		err := rows.Scan(&single.ContentId, &single.Summary)

		if err != nil {
			panic(err)
		}
		result = append(result, single)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	fmt.Println(result)
}
*/

func getData() []Recipe {
	fileData, err := ioutil.ReadFile("./data.json")
	if err != nil {
		panic(err)
	}
	var result struct {
		Data struct {
			Search struct {
				List struct {
					Recipe struct {
						Data []Recipe `json:"data"`
					} `json:"recipe"`
				} `json:"list"`
			} `json:"search"`
		} `json:"data"`
	}
	err = json.Unmarshal(fileData, &result)
	if err != nil {
		panic(err)
	}
	return result.Data.Search.List.Recipe.Data
}

func insertData(db *sql.DB, recipes []Recipe) {
	for i := 0; i != 1000; i++ {

		for _, recipe := range recipes {
			_, err := db.Exec("insert into t_recipe(title) values($1)", recipe.Title)
			if err != nil {
				panic(err)
			}
		}
	}
}

func main() {
	recipes := getData()
	db := connectDB()
	insertData(db, recipes)
}
