package main

import (
	"fmt"
	. "github.com/fishedee/app/database"
	. "github.com/fishedee/language"
	"math/rand"
	"time"
)

type User struct {
	UserId     int `xorm:"autoincr"`
	Name       string
	Age        int
	Sign       string
	CreateTime time.Time
	ModifyTime time.Time
}

func getRandString(minLength int, maxLength int) string {
	length := rand.Intn(maxLength-minLength) + minLength
	result := make([]byte, length, length)
	for i, _ := range result {
		result[i] = byte(rand.Intn(27)) + '0'
	}
	return string(result)
}
func main() {
	rand.Seed(time.Now().Unix())

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
			Name: getRandString(5, 8),
			Age:  rand.Intn(10),
			Sign: getRandString(20, 120),
		})
	}

	for j := 0; j != 400; j++ {
		db.MustInsert(users)
	}

	fmt.Println("finish!")
}
