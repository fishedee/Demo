#!/bin/sh

#if 数字控制
echo "请输入你家狗狗的年龄: "
read age
if [[ $age -eq 1 ]];then
	echo "相当于 14 岁的人。"
elif [[ $age -eq 2 ]];then
	echo "相当于 22 岁的人。"
elif [[ $age -gt 3 || $age -eq 3 ]];then
	let human=(${age}-2)*5+22
	echo "对应人类年龄:${human} "
else
	echo "你是在逗我吧!"
fi

#if 字符串控制
echo "请输入你的名字: "
read age
if [[ $age == "fish" ]];then
	echo "你是fish"
elif [[ $age != "mei" ]];then
	echo "我不知道你是谁"
else
	echo "你是mei"
fi

#while 控制
n=100
sum=0
counter=1
while [[ $counter -lt n || $counter -eq n ]];do
    let sum=$sum+$counter
    let counter+=1
done

echo "1 到 ${n} 之和为:${sum}"

#for 控制
languages=("C" "C++" "Perl" "Python")
for x in ${languages[@]};do
	echo $x
done
