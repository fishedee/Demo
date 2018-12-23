#创建数据库
drop database if exists MySqlTest;
create database MySqlTest;
use MySqlTest;

#创建表
create table t_product(
	productId integer not null auto_increment,	
	name varchar(128) not null,
	itemIds varchar(10240) not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP, 
	primary key( productId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

alter table t_product add fulltext index itemIdsIndex(itemIds);

insert into t_product(productId,name,itemIds) values
(10001,"产品1","10001 10002"),
(10002,"产品2","10003"),
(10003,"产品3","10004 10002"),
(10004,"产品4","10005 10001 10007");

select * from t_product where match(itemIds) against('10001' in boolean mode)\G;
select * from t_product where match(itemIds) against('10002' in boolean mode)\G;
select * from t_product where match(itemIds) against('10003' in boolean mode)\G;
select * from t_product where match(itemIds) against('10004' in boolean mode)\G;
select * from t_product where match(itemIds) against('10005 10001' in boolean mode)\G;
select * from t_product where match(itemIds) against('+10005 +10001' in boolean mode)\G;