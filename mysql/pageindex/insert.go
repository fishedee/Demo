package main

import (
	"fmt"
	. "github.com/fishedee/app/database"
	. "github.com/fishedee/language"
	"strconv"
)

type User struct {
	UserId int `xorm:"autoincr"`
	Name   string
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
		Passowrd: "1",
		Database: "MySqlTest",
		Charset:  "utf8mb4",
	})
	if err != nil {
		panic(err)
	}

	users := []User{}
	for i := 0; i != 10000; i++ {
		users = append(users, User{
			Name: strconv.Itoa(i),
		})
	}

	for j := 0; j != 1000; j++ {
		db.MustInsert(users)
	}

	fmt.Println("finish!")
}
