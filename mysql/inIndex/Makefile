.PHONY:build test
go:build test
	echo "finish!"
build:
	mysql -uroot -p1 < create.sql
	go run data.go
	mysql -uroot -p1 < data.sql
	mysql -uroot -p1 < index.sql
test:
	mysql -uroot -p1 < query.sql
