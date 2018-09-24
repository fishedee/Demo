#创建数据库
drop database if exists MySqlTest;
create database MySqlTest;
use MySqlTest;

#创建表
create table t_user(
	userId integer not null auto_increment,	
	name varchar(32) not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP, 
	primary key( userId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

alter table t_user add index nameIndex(name);

create table t_article(
	articleId integer not null auto_increment,
	userId integer not null,
	title varchar(32) not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP, 
	primary key( articleId )
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

alter table t_article add index userIdIndex(userId);
