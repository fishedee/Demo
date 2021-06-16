drop database if exists Test;
create database Test;

use Test;

create table country(
	id integer not null auto_increment,
	country_name varchar(255) not null,
	country_code varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

use Test;

create table t_people(
	id integer not null auto_increment,
	people_name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

 create table hibernate_sequence (
   next_val bigint
) engine=MyISAM;

insert into hibernate_sequence(next_val) values(20001);

create table car(
	id integer not null auto_increment,
	brand varchar(12) not null,
	name varchar(255) not null,
	price decimal(20,10) not null,
	create_time timestamp not null,
	modify_time timestamp not null,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table car2(
	id integer not null auto_increment,
	name varchar(255) not null,
	create_time timestamp not null,
	modify_time timestamp not null,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;