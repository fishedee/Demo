#!/bin/sh

#访问数组

list1=('Google' 'Runoob' 1997 2000)
list2=(1 2 3 4 5 6 7);

echo "list1[0]: ${list1[0]}"
echo "list2[1:5]: ${list2[@]:1:5}"
echo "list len: ${#list1[@]}"

#添加数组元素
list=('Google' 'Runoob' 1997 2000)
list=(${list[@]} 2003)
echo "list append: ${list[@]},length :${#list[@]}"

#更新数组
list=('Google' 'Runoob' 1997 2000)
echo "第三个元素为 : ${list[2]}"
list[2]=2001
echo "更新后的第三个元素为 : ${list[2]}"

#删除数组元素
list=('Google' 'Runoob' 1997 2000)
echo "${list[@]}"
unset list[2]
echo "删除第三个元素 : ${list[@]}"

#遍历数组
for item in ${list[@]};do
    echo "$item"
done