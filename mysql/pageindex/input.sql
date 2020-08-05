#创建数据库
drop database if exists MySqlTest;
create database MySqlTest;
use MySqlTest;

#创建表
create table t_user(
	userId integer auto_increment not null,
	name varchar(16) not null,
	age integer not null,
	sign varchar(128) not null,
	createTime datetime not null default CURRENT_TIMESTAMP,
	modifyTime datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(userId)
)engine=innodb  default charset=utf8mb4 auto_increment=10000;

#导入数据的特点是，age的区分度很低，只有0~10的之间的10种可能
alter table t_user add index ageAndUserIdIndex(age,userId);

select count(*) from t_user;

#插入数据后，试一下执行下面两条语句所产生的区别
#查询的特点是匹配的行数很多，而且还要筛选掉前面页很多的数据

#这个语句的执行时间为0.89秒，因为要经过where与order by以后，获取的数据每个还要回聚簇索引查找全部字段一次，最后再执行一次limit
select * from t_user where age = 8 order by userId asc limit 100000,10;#用时0.89秒，

#这个语句的执行时间为0.01秒，因为经过where与order by以后，获取的仅需要userId一个字段，不需要回表，执行limit以后，最后统一回表一次即可。
select * from t_user as a inner join (select userId from t_user where age = 8 order by userId asc limit 100000,10) as b on a.userId = b.userId;

#具体看这里https://zhuanlan.zhihu.com/p/163658548