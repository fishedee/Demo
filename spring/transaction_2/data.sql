drop database if exists Test;
create database Test;

use Test;

create table t_user(
	userId integer not null auto_increment,
	name varchar(255) not null,
	age integer not null,
	primary key(userId)
)engine=innodb default charset=utf8mb4;