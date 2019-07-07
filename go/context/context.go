package main

import (
	"context"
	"database/sql"
	"github.com/fishedee/app/router"
	"net/http"
)

type Context interface {
	context.Context
	DB() *Connection
}

type contextImplement struct {
	context.Context
	connection *Connection
}

func (this *contextImplement) DB() *Connection {
	return this.connection
}

func NewContext(db *sql.DB) Context {
	ctx := context.Background()
	connection := NewConnection(db, ctx)
	return &contextImplement{
		Context:    ctx,
		connection: connection,
	}
}

func NewContextMiddleware(db *sql.DB) router.RouterMiddleware {
	return func(prev router.RouterMiddlewareContext) router.RouterMiddlewareContext {
		last, isOk := prev.Handler.(func(ctx Context, w http.ResponseWriter, r *http.Request))
		if isOk == false {
			return prev
		}
		return router.RouterMiddlewareContext{
			Data: prev.Data,
			Handler: func(w http.ResponseWriter, r *http.Request, p router.RouterParam) {
				context := NewContext(db)
				last(context, w, r)
			},
		}
	}
}
