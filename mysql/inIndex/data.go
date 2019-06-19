package main

import (
	"bytes"
	"fmt"
	. "github.com/fishedee/language"
	"io/ioutil"
	"math/rand"
	"os"
)

type Remind struct {
	RemindId        int `xorm:"autoincr"`
	ReceiveClientId int
	SendClientId    int
	Text            string
	Id              int
	RemindType      int
	IsRead          int
	ContentId       int
	ContentType     int
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

func insertRemind(str *bytes.Buffer, tableName string, reminds []Remind) {
	str.WriteString("insert into " + tableName + "(receiveClientId,sendClientId,text,id,remindType,isRead,contentId,contentType) values\n")
	for index, remind := range reminds {
		str.WriteString(fmt.Sprintf("(%v,%v,'%v',%v,%v,%v,%v,%v)",
			remind.ReceiveClientId,
			remind.SendClientId,
			remind.Text,
			remind.Id,
			remind.RemindType,
			remind.IsRead,
			remind.ContentId,
			remind.ContentType))
		if index == len(reminds)-1 {
			str.WriteString(";\n")
		} else {
			str.WriteString(",\n")
		}
	}
}

func main() {
	defer CatchCrash(func(e Exception) {
		fmt.Printf("fail %v\n", e.Error())
	})
	builder := bytes.Buffer{}
	builder.WriteString("use MySqlTest;\n\n")
	builder.WriteString("set global max_allowed_packet = 100 * 1024 * 1024;\n\n")

	//普通的数据，模拟实际的数据分布
	remind1s := []Remind{}
	remindCount := 3000000
	for i := 0; i != remindCount; i++ {
		remind1s = append(remind1s, Remind{
			ReceiveClientId: randomInt() % 10000,
			RemindType:      randomInt() % 10,
			ContentType:     randomInt() % 5,
		})
	}
	insertRemind(&builder, "t_remind_1", remind1s)

	//更一般的数据
	remind2s := []Remind{}
	for i := 0; i != remindCount; i++ {
		remind2s = append(remind2s, Remind{
			ReceiveClientId: randomInt() % 3,
			RemindType:      randomInt() % 7,
			ContentType:     randomInt() % 5,
		})
	}
	insertRemind(&builder, "t_remind_2", remind2s)

	os.Remove("data.sql")
	ioutil.WriteFile("data.sql", builder.Bytes(), os.ModePerm)
	fmt.Println("finish!")
}
