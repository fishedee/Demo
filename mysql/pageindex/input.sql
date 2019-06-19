#创建数据库
drop database if exists MySqlTest;
create database MySqlTest;
use MySqlTest;

#创建表
create table t_user(
	userId integer auto_increment not null,
	name varchar(128) not null,
	primary key(userId)
)engine=innodb  default charset=utf8mb4 auto_increment=10000;
