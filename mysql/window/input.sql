#创建数据库
drop database if exists MySqlTest;
create database MySqlTest;
use MySqlTest;

#创建表
create table t_order(
	orderId integer not null auto_increment,
	userId integer not null,
	total integer not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP, 
	primary key( orderId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

insert into t_order(userId,total,createTime) values
(10001,1,date_sub(now(),interval 1 hour)),
(10001,22,date_sub(now(),interval 1 hour)),
(10001,33,date_sub(now(),interval 3 hour)),
(10001,22,date_sub(now(),interval 4 hour)),
(10002,1,date_sub(now(),interval 5 hour)),
(10002,22,date_sub(now(),interval 5 hour)),
(10002,5,date_sub(now(),interval 7 hour)),
(10003,1,date_sub(now(),interval 8 hour)),
(10003,22,date_sub(now(),interval 9 hour)),
(10003,33,date_sub(now(),interval 10 hour)),
(10003,1,date_sub(now(),interval 11 hour)),
(10003,22,date_sub(now(),interval 12 hour)),
(10003,5,date_sub(now(),interval 13 hour));

#不分组聚合排名，不行
#select userId,total,rank() from t_order;

#不分组聚合求和，只剩下一条数据
select any_value(userId),sum(total) from t_order;

#不分组窗口排名，每条数据都会被保留，rank变成了各行的排名
select userId,total,rank() over(order by total desc) as totalRank from t_order;

#不分组窗口求和，每条数据都会被保留，sum变成了累加的操作
select userId,total,createTime,sum(total) over(order by createTime asc) from t_order;

#分组窗口排名，每条数据都会被保留，rank变成了分组内各行的排名
select userId,total,rank() over(partition by userId order by total desc) as totalRank from t_order;

#分组窗口求和，每条数据都会被保留，sum变成了分组内累加的操作
select userId,total,createTime,sum(total) over(partition by userId order by createTime asc) from t_order;

#不分组窗口求和，每条数据都会被保留，sum变成了累加的操作，默认操作，当前行是指包含与当前数值相同的所有行
select userId,total,createTime,sum(total) over(order by createTime asc RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as sumTotal from t_order;

#不分组窗口求和，每条数据都会被保留，sum变成了累加的操作，当前行是指实际按行排名位置的所在行
select userId,total,createTime,sum(total) over(order by createTime asc ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as sumTotal from t_order;

#不分组窗口求和，每条数据都会被保留，sum变成了累加的操作，当前行是指实际按行排名位置的所在行，指的是前后三行的累加
select userId,total,createTime,sum(total) over(order by createTime asc ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) as sumTotal from t_order;

#分组窗口排名的朴素实现
select
IF(@y=t_order.userId, @x:=@x+1, @x:=1) as totalRank ,
IF(@y=t_order.userId, @y, @y:=t_order.userId) as userId,
t_order.total as total
from t_order,(select @x:=1,@y:=NULL) as b
order by t_order.userId, t_order.total desc