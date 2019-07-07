package main

import (
	"encoding/json"
	"fmt"
	"github.com/fishedee/app/log"
	"github.com/fishedee/app/middleware"
	"github.com/fishedee/app/router"
	"net/http"
)

type User struct {
	UserId int
	Name   string
}

func main() {
	db := NewDB("root", "1", "localhost", 3306, "Yinghao", "utf8mb4", "utf8_general_ci")
	contextMiddleware := NewContextMiddleware(db)

	log, err := log.NewLog(log.LogConfig{})
	if err != nil {
		panic(err)
	}
	logMiddleware := middleware.NewLogMiddleware(log)

	routerFactory := router.NewRouterFactory()
	routerFactory.Use(logMiddleware)
	routerFactory.Use(contextMiddleware)
	routerFactory.GET("/", func(ctx Context, w http.ResponseWriter, r *http.Request) {
		rows, err := ctx.DB().Query("select userId,name from t_user")
		if err != nil {
			panic(err)
		}
		users := []User{}
		for rows.Next() {
			var userId int
			var name string
			rows.Scan(&userId, &name)
			users = append(users, User{
				UserId: userId,
				Name:   name,
			})
		}
		data, err := json.Marshal(users)
		if err != nil {
			panic(err)
		}
		w.Write(data)
	})

	fmt.Println("server is running...")
	server := &http.Server{
		Addr:    ":8818",
		Handler: routerFactory.Create(),
	}
	err = server.ListenAndServe()
	if err != nil {
		panic(err)
	}
}
