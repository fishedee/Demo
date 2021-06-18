drop database if exists Test;
create database Test;

use Test;

 create table hibernate_sequence (
   next_val bigint
) engine=MyISAM;

insert into hibernate_sequence(next_val) values(20001);

create table car(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null,
	modify_time timestamp not null,
	primary key(id)
)engine=innodb default charset=utf8mb4;

create table people(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null,
	modify_time timestamp not null,
	primary key(id)
)engine=innodb default charset=utf8mb4;