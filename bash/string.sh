#!/bin/sh

# 字符串长度与子字符串
var1='Hello World!'
var2="Runoob"

length=${#var1}
echo $length
substr=${var2:1:3}
echo $substr

# 字符串连接
var3=var1+var2

echo $var3

#字符串格式化
echo "${var1},my name is ${var2}"
