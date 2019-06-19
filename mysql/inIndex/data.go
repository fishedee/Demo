package main

import (
	"fmt"
	. "github.com/fishedee/app/database"
	. "github.com/fishedee/language"
	"math/rand"
	"time"
)

type Remind1 struct {
	RemindId        int `xorm:"autoincr"`
	ReceiveClientId int
	SendClientId    int
	Text            string
	Id              int
	RemindType      int
	IsRead          int
	ContentId       int
	ContentType     int
	CreateTime      time.Time `xorm:"created"`
	ModifyTime      time.Time `xorm:"updated"`
}

func (this Remind1) TableName() string {
	return "t_remind_1"
}

type Remind2 struct {
	RemindId        int `xorm:"autoincr"`
	ReceiveClientId int
	SendClientId    int
	Text            string
	Id              int
	RemindType      int
	IsRead          int
	ContentId       int
	ContentType     int
	CreateTime      time.Time `xorm:"created"`
	ModifyTime      time.Time `xorm:"updated"`
}

func (this Remind2) TableName() string {
	return "t_remind_2"
}

func randomInt() int {
	return rand.Int()
}

func randomString(length int) string {
	result := []rune{}
	for i := 0; i != length; i++ {
		var single rune
		randInt := rand.Int() % (10 + 26 + 26)
		if randInt < 10 {
			single = rune('0' + randInt)
		} else if randInt < 10+26 {
			single = rune('A' + (randInt - 10))
		} else {
			single = rune('a' + (randInt - 10 - 26))
		}
		result = append(result, single)
	}
	return string(result)
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

	//普通的数据，模拟实际的数据分布
	for i := 0; i != 1000; i++ {
		reminds := []Remind1{}
		for j := 0; j != 1000; j++ {
			reminds = append(reminds, Remind1{
				ReceiveClientId: randomInt() % 10000,
				RemindType:      randomInt() % 10,
				ContentType:     randomInt() % 10,
			})
		}
		db.MustInsert(reminds)
	}

	//更一般的数据
	for i := 0; i != 1000; i++ {
		reminds := []Remind2{}
		for j := 0; j != 1000; j++ {
			reminds = append(reminds, Remind2{
				ReceiveClientId: randomInt() % 10000,
				RemindType:      randomInt() % 1000,
				ContentType:     randomInt() % 1000,
			})
		}
		db.MustInsert(reminds)
	}

	fmt.Println("finish!")
}
