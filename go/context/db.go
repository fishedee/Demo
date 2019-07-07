package main

import (
	"context"
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

type Connection struct {
	db  *sql.DB
	ctx context.Context
}

func NewConnection(db *sql.DB, ctx context.Context) *Connection {
	return &Connection{
		db:  db,
		ctx: ctx,
	}
}

func (this *Connection) Query(query string, args ...interface{}) (*sql.Rows, error) {
	return this.db.QueryContext(this.ctx, query, args...)
}

func NewDB(user string, password string, host string, port int, database string, charset string, collation string) *sql.DB {
	dblink := fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=%v&collation=%v&loc=Local",
		user,
		password,
		host,
		port,
		database,
		charset,
		collation,
	)
	db, err := sql.Open("mysql", dblink)
	if err != nil {
		panic(err)
	}
	return db
}
