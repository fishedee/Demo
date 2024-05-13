env "PGPASSWORD=123" psql -U postgres -d test -f input.sql
env "PGPASSWORD=123" psql -U t1 -d test -f select.sql

env "PGPASSWORD=123" psql -U postgres -d test -f selectAll.sql