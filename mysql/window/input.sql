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

insert into t_order(userId,total) values
(10001,1),
(10001,22),
(10001,33),
(10001,22),
(10002,1),
(10002,22),
(10002,5),
(10003,1),
(10003,22),
(10003,33),
(10003,1),
(10003,22),
(10003,5);

#求和
select userId,total,sum(total) over(partition by userId order by createTime asc) as sumTotal
from t_order;

select a.userId as userId,a.total as total,b.sumTotal as sumTotal
from t_order as a join 
(
	select userId,sum(total) as sumTotal
	from t_order
	group by userId
)as b on a.userId = b.userId;

#排名
select userId,total,rank() over(partition by userId order by total desc) as totalRank
from t_order;

select
IF(@y=t_order.userId, @x:=@x+1, @x:=1) as totalRank ,
IF(@y=t_order.userId, @y, @y:=t_order.userId) as userId,
t_order.total as total
from t_order,(select @x:=1,@y:=NULL) as b
order by t_order.userId, t_order.total desc