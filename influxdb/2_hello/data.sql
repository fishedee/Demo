create database test;

show databases;

use test

#最后一个值肯定是空格,cpu是measurement，相当于table，其他的就是key=value
insert cpu,host=serverA,region=us_west value=0.64
insert cpu,host=serverB,region=uk_west value=0.64

#空格隔开，左边是tag/value，右边是field/value，tag会索引，但field不会索引，tag是可选的，但field是必须的
insert cpu,host=serverA value=9,xvalue=8

#可以动态添加列
insert cpu,host=serverB,region=uk_west xvalue=0.64

select * from cpu
select * from cpu where value > 0.6
select * from cpu where host = 'serverA'
