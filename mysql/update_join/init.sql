drop database if exists update_join;

create database update_join;

use update_join;

create table item(
    id integer not null,
    name varchar(64) not null,
    primary key(id)
)engine=innodb default charset=utf8mb4;

create table item_order(
    id integer not null,
    item_id integer not null,
    item_name varchar(64) not null,
    price decimal(18,4) not null,
    primary key(id)
)engine=innodb default charset=utf8mb4;

insert into item(id,name) values
(101,'item_1'),
(102,'item_2'),
(103,'item_3');

insert into item_order(id,item_id,item_name,price)values
(201,101,'',100.0),
(202,103,'',90),
(203,104,'',80),
(204,101,'',79),
(205,102,'',667);