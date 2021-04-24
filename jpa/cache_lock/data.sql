drop database if exists Test;
create database Test;

use Test;

create table sales_order(
	id integer not null,
	name varchar(255) not null,
	city varchar(255) not null,
	street varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table sales_order_items(
	sales_order_id integer not null,
	items_order integer not null default 0,
	item_id integer not null,
	name varchar(255) not null,
	amount decimal(15,2) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(sales_order_id,items_order)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table people(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table people2(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table country(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table car(
	id integer not null,
	name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table hibernate_sequence(
	next_val bigint not null,
	primary key(next_val)
)engine=innodb;

insert into hibernate_sequence(next_val) values(10001);


