#!/bin/sh

#/query地址写入url
curl -i -XPOST http://localhost:8086/query --data-urlencode "q=CREATE DATABASE mydb"

#/write地址写入数据
curl -i -XPOST 'http://localhost:8086/write?db=mydb' --data-binary 'cpu_load_short,host=server01,region=us-west value=0.64 1434055562000000000'


