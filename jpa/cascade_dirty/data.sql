drop database if exists Test;
create database Test;

use Test;

create table sales_order(
	id integer not null auto_increment,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table sales_order_users(
	sales_order_id integer not null,
	users_order integer not null,
	name varchar(256) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(sales_order_id,users_order)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table purchase_order(
	id integer not null auto_increment,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table purchase_order_items(
	id integer not null,
	purchase_order_id integer not null,
	items_order integer not null,
	name varchar(256) not null,
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


