package main

import (
	"encoding/json"
	"github.com/fishedee/gof"
	"github.com/fishedee/tools/exception"
	"net/http"
	"net/url"
)

func HandleJsonAndFormMiddleware() gof.RouterMiddleware {
	return func(prev gof.RouterMiddlewareContext) gof.RouterMiddlewareContext {
		last, isOk := prev.Handler.(func(form url.Values) interface{})
		if isOk == false {
			return prev
		}
		return gof.RouterMiddlewareContext{
			Data: prev.Data,
			Handler: func(w http.ResponseWriter, r *http.Request, param gof.RouterParam) {
				err := r.ParseForm()
				if err != nil {
					panic(err)
				}
				form := r.Form
				for _, singleParam := range param {
					form.Add(singleParam.Key, singleParam.Value)
				}
				var data interface{}
				func() {
					defer exception.Catch(func(e exception.Exception) {
						w.WriteHeader(200)
						data = map[string]interface{}{
							"code": 1,
							"msg":  e.GetMessage(),
							"data": nil,
						}
					})
					result := last(form)
					data = map[string]interface{}{
						"code": 0,
						"msg":  "",
						"data": result,
					}
				}()
				w.WriteHeader(200)
				dataBytes, err := json.Marshal(data)
				if err != nil {
					panic(err)
				}
				w.Write(dataBytes)
			},
		}
	}
}

func main() {
	router := gof.NewDefaultRouterFactory()

	router.Use(HandleJsonAndFormMiddleware())
	router.GET("/test", func(form url.Values) interface{} {
		userName := form.Get("userName")
		if userName == "fish" {
			exception.Throw(1, "this is business error")
			return nil
		} else if userName == "cat" {
			panic("this is crash error")
		} else {
			return "this is nothing"
		}
	})

	// Listen and serve on 0.0.0.0:8080
	http.Handle("/", router.Create())
	http.ListenAndServe(":8080", nil)
}
