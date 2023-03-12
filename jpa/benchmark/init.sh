#!/bin/sh
PGPASSWORD=123 psql -Upostgres trade_erp < input.sql
