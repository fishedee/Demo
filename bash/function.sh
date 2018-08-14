#!/bin/sh

#定义和调用函数
area(){
	width=$1
	height=$2
	let result=$width*$height
	return $result
}

print_welcome(){
	name=$1
	echo "Welcome $name"
}

print_welcome "Runoob"
w=4
h=5
area $w $h
a=$?
echo "width = $w height = $h area= ${a}"

#不定参数
printinfo(){
	echo "打印任何传入的参数"
   for var in $@;do
     	echo $var
   done
}

printinfo 10
printinfo 70 60 50 