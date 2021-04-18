drop database if exists Test;
create database Test;

use Test;

create table user(
	id integer not null auto_increment,
	name varchar(255) not null,
	country varchar(255) not null,
	city varchar(255) not null,
	street varchar(255) not null,
	zipcode varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table student(
	id integer not null auto_increment,
	school varchar(255) not null,
	name varchar(255) not null,
	country varchar(255) not null,
	city varchar(255) not null,
	student_street varchar(255) not null,
	zipcode varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table user_follow(
	user_id integer not null,
	follow_user_id integer not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(user_id,follow_user_id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table sales_order(
	id integer not null auto_increment,
	sales_name varchar(255) not null,
	total varchar(255) not null,
	remark varchar(255) not null,
	owner varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table purchase_order(
	id integer not null auto_increment,
	company varchar(255) not null,
	total varchar(255) not null,
	purchase_remark varchar(255) not null,
	owner varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table hibernate_sequence(
	next_val bigint not null,
	primary key(next_val)
)engine=innodb;

insert into hibernate_sequence(next_val) values(10001);
