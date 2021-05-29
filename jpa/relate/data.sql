drop database if exists Test;
create database Test;

use Test;

create table country(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table people(
	id integer not null,
	name varchar(255) not null,
	country_id integer not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;


create table country4(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table people4(
	id integer not null,
	name varchar(255) not null,
	country_id integer not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table country2(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table people2(
	id integer not null,
	name varchar(255) not null,
	country2_id integer,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table country3(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table people3(
	id integer not null,
	name varchar(255) not null,
	country3_id integer,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table student(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table employee(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table human(
	id integer not null,
	man_type varchar(255) not null,
	man_id integer not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table hibernate_sequence(
	next_val bigint not null,
	primary key(next_val)
)engine=innodb;

insert into hibernate_sequence(next_val) values(10001);

create table my_sequence(
	next_val bigint not null,
	primary key(next_val)
)engine=innodb;

insert into my_sequence values (10001);


