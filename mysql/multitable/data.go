package main

import (
	"bytes"
	"fmt"
	. "github.com/fishedee/language"
	"io/ioutil"
	"math/rand"
	"os"
)

type User struct {
	Name string
}

type Article struct {
	UserId int
	Title  string
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

func addArticle(str *bytes.Buffer, data []Article) {
	str.WriteString("insert into t_article(userId,title) values\n")
	for index, article := range data {
		str.WriteString(fmt.Sprintf("(%v,'%v')", article.UserId, article.Title))
		if index == len(data)-1 {
			str.WriteString(";\n")
		} else {
			str.WriteString(",\n")
		}
	}

}

func addUser(str *bytes.Buffer, data []User) {
	str.WriteString("insert into t_user(name) values\n")
	for index, user := range data {
		str.WriteString(fmt.Sprintf("('%v')", user.Name))
		if index == len(data)-1 {
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
	builder.WriteString("set global max_allowed_packet=67108864;\n\n")

	users := []User{}
	userCount := 100000
	for i := 0; i != userCount; i++ {
		users = append(users, User{
			Name: randomString(16),
		})
	}
	addUser(&builder, users)

	articleCount := userCount * 10
	articles := []Article{}
	for i := 0; i != articleCount; i++ {
		articles = append(articles, Article{
			UserId: randomInt()%userCount + 10000,
			Title:  randomString(16),
		})
	}
	addArticle(&builder, articles)
	os.Remove("data.sql")
	ioutil.WriteFile("data.sql", builder.Bytes(), os.ModePerm)
	fmt.Println("finish!")
}
