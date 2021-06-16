drop database if exists Test;
create database Test;

use Test;

create table purchase_order(
	id integer not null auto_increment,
	total decimal(15,4) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table purchase_order_items(
	purchase_order_id integer not null,
	items_order integer not null,
	item_id integer not null,
	price decimal(15,2) not null,
	amount decimal(15,2) not null,
	total decimal(15,4) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(purchase_order_id,items_order)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table material_stock_order(
	id integer not null auto_increment,
	item_size integer not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table material_stock_order_items(
	material_stock_order_id integer not null,
	items_key integer not null,
	material_id integer not null,
	amount decimal(15,2) not null,
	unit_id integer not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(material_stock_order_id,items_key)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table item_stock_order(
	id integer not null auto_increment,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(id)
)engine=innodb default charset=utf8mb4 auto_increment = 10001;

create table item_stock_order_items(
	item_stock_order_item_id integer not null auto_increment,
	item_stock_order_id integer not null,
	item_id integer not null,
	amount decimal(15,2) not null,
	item_name varchar(255) not null,
	create_time timestamp not null default CURRENT_TIMESTAMP,
	modify_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	primary key(item_stock_order_item_id)
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


