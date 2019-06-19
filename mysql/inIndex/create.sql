#创建数据库
drop database if exists MySqlTest;
create database MySqlTest;
use MySqlTest;

#创建表
create table t_remind_1(
	remindId integer not null auto_increment,
	receiveClientId integer not null,
	sendClientId integer not null,
	text varchar(256) not null,
	id integer not null,
	remindType integer not null,
	isRead integer not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP, 
	contentId integer not null,
	contentType integer not null,
	primary key(remindId)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table t_remind_2(
	remindId integer not null auto_increment,
	receiveClientId integer not null,
	sendClientId integer not null,
	text varchar(256) not null,
	id integer not null,
	remindType integer not null,
	isRead integer not null,
	createTime timestamp not null default CURRENT_TIMESTAMP,
	modifyTime timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP, 
	contentId integer not null,
	contentType integer not null,
	primary key(remindId)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;
